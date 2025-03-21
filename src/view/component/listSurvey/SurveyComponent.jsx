

// import statistikLuasPanen from './foodestate/statistikLuasPanen.json'
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import * as SurveyTheme from "survey-core/themes";;
import { storeSurveyDinamis } from '../../../api/survey';
import dataFormListSurvey from './../../../data/dataFormListSurvey.json'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDetailQRcode } from "../../../api/qrcode";
import apiClient from "../../../api/api";




function SurveyComponent() {

    const { kodeqr } = useParams()

    const [surveyJson, setSurveyJson] = useState({})



    // "url": "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json",
    // "url": `${import.meta.env.VITE_API_BE_URL}/api/provinsi`,


    let informasiLokasi = {
        "name": "page1",
        "title": "Informasi Lokasi",
        "elements": [
            {
                "type": "dropdown",
                "name": "province_id",
                "title": "Nama Provinsi",
                "isRequired": true,
                "choicesByUrl": {
                    "url": `${import.meta.env.VITE_API_BE_URL}/api/provinsi`,
                    "valueName": "provinsi_id",
                    "titleName": "nama_provinsi",
                    "path": "data"
                }
            }, {
                "type": "dropdown",
                "name": "kabkota_id",
                "title": "Nama Kabupaten/Kota",
                "isRequired": true,
                "choicesByUrl": {
                    "url": `${import.meta.env.VITE_API_BE_URL}/api/kabkota/{province_id}`,
                    "valueName": "kabkota_id",
                    "titleName": "nama_kabupaten_kota",
                    "path": "data"
                }
            },
            {
                "type": "dropdown",
                "name": "kecamatan_id",
                "title": "Nama Kecamatan",
                "isRequired": true,
                "choicesByUrl": {
                    "url": `${import.meta.env.VITE_API_BE_URL}/api/kecamatan/{kabkota_id}`,
                    "valueName": "kecamatan_id",
                    "titleName": "nama_kecamatan",
                    "path": "data"
                }
            },
            {
                "type": "comment",
                "name": "alamat_detail",
                "title": "Alamat Detail",
                "isRequired": true
            },


        ]
    }



    function getDataByKode(kode) {
        // Menelusuri listFormSurvey dan mencari list berdasarkan kode
        for (let i = 0; i < dataFormListSurvey.listFormSurvey.length; i++) {
            const form = dataFormListSurvey.listFormSurvey[i];
            const found = form.list.find(item => item.kode === kode);
            if (found) {
                return found; // Mengembalikan data yang ditemukan
            }
        }
        return null; // Jika tidak ditemukan
    }


    useEffect(() => {
        getDetailQRcode(kodeqr).then((res) => {
            let getJson = getDataByKode(res.data[0]?.kode_topik)
            if (!getJson) {
                alert('survey tidak ada')
            }
            getJson.pages = [informasiLokasi, ...getJson.pages]
            setSurveyJson(getJson);
        })
    }, [kodeqr])


    const survey = new Model(surveyJson);


    survey.applyTheme(SurveyTheme.DefaultDark);

    survey.onComplete.add((sender, options) => {

        console.log('jsonObj', sender.jsonObj);
        console.log('data', sender.data);


        let getPagesJson = sender.jsonObj.pages
        try {

            function getOriginalName(str) {
                if (str != undefined) {
                    return str.split('-')[0]
                }
            }

            function getNoUrutByName(str) {
                let result = '';
                for (let i = 0; i < str.length; i++) {
                    if (!isNaN(str[i]) && str[i] !== ' ') {
                        result += str[i];
                    } else if (str == 'province_id') {
                        result = '0'
                    } else if (str == 'kabkota_id') {
                        result = '0'
                    } else if (str == 'kecamatan_id') {
                        result = '0'
                    } else if (str == 'alamat_detail') {
                        result = '0'
                    }
                }
                return result;
            }

            // ubah  jawaban dari object ke array
            let answerObjToArr = Object.entries(sender.data).map(([key, value]) => {
                return ({ key, value })
            });

            // mapping question, no, name, type,title, value=null
            let mappingQuestion = []
            for (let i = 0; i < getPagesJson.length; i++) {
                const getElements = getPagesJson[i].elements
                for (let j = 0; j < getElements.length; j++) {
                    mappingQuestion.push({
                        no: getNoUrutByName(getElements[j].name),
                        name: getElements[j].name,
                        type: getElements[j].type,
                        title: getElements[j].title,
                        value: ''
                    })
                }
            }

            function replaceSameNameAnswer(senderDataAnswer) {
                function getDuplicateKey(data) {
                    let getDuplicateKey = []
                    for (let i = 0; i < data.length; i++) {
                        let removeComment = data[i].key.split('-');
                        getDuplicateKey.push(removeComment[0])
                    }
                    return getDuplicateKey
                }

                let nameWithDash = senderDataAnswer.filter(item => item.key?.includes('-')) // ex :"Other (-Comment)"

                let resultss = []
                if (nameWithDash) {

                    if (senderDataAnswer.filter((d) => Array.isArray(d.value)).length > 0) { //cek apakah ini checkbox?

                        const filterCheckbox = (data) => {
                            let getCheckbox = [];

                            for (let i = 0; i < data.length; i++) {
                                const item = data[i];


                                if (Array.isArray(item.value)) {                                 // Jika item memiliki value berupa array

                                    let comment = null;// Mencari komentar yang sesuai
                                    const commentKey = `${item.key}-Comment`;

                                    for (let j = 0; j < data.length; j++) {
                                        if (data[j].key === commentKey) {
                                            comment = data[j];
                                            break; // Menghentikan loop ketika komentar ditemukan
                                        }
                                    }

                                    let newValue = [];
                                    for (let k = 0; k < item.value.length; k++) { // Membuat array value tanpa 'other'
                                        if (item.value[k] !== 'other') {
                                            newValue.push(item.value[k]);
                                        }
                                    }

                                    if (comment) {// Jika ada komentar, tambahkan ke value
                                        newValue.push(comment.value);
                                    }

                                    getCheckbox.push({ // Menambahkan objek yang telah dimodifikasi ke getCheckbox
                                        ...item,
                                        value: newValue
                                    });
                                }
                            }

                            return getCheckbox
                        }
                        let filteredCheckbox = filterCheckbox(senderDataAnswer)

                        function replaceQuestionData(existingData, newData) {

                            for (let i = 0; i < existingData.length; i++) {
                                const existingItem = existingData[i];

                                for (let j = 0; j < newData.length; j++) { // Loop melalui newData untuk mencocokkan key dan mengganti value
                                    const newItem = newData[j];

                                    if (existingItem.key === newItem.key) { // Jika key sama, ganti value
                                        existingItem.value = newItem.value;
                                    }
                                }
                            }
                            return existingData
                        }
                        let replaceQuestionChecbox = replaceQuestionData(senderDataAnswer, filteredCheckbox)

                        function removeCommentFromArray(data) {

                            for (let i = 0; i < data.length; i++) {// Loop melalui setiap item dalam array data
                                const item = data[i];

                                if (Array.isArray(item.value)) { // Cek jika item value adalah array
                                    const key = item.key;

                                    for (let j = 0; j < data.length; j++) { // Loop lagi untuk mencari key dengan format '-Comment'
                                        const commentItem = data[j];

                                        if (commentItem.key === key + '-Comment') { // Jika ditemukan 'questionX-Comment' dan key-nya cocok dengan 'questionX', hapus item ini
                                            data.splice(j, 1); // Hapus item comment
                                            break; // Keluar dari loop karena sudah dihapus
                                        }
                                    }
                                }
                            }

                            return data
                        }

                        senderDataAnswer = removeCommentFromArray(replaceQuestionChecbox)
                        let nameWithDashCheckbox = senderDataAnswer.filter(item => item.key?.includes('-'))

                        resultss = senderDataAnswer.filter(item => !getDuplicateKey(nameWithDashCheckbox).includes(item.key));
                        return resultss
                    } else {
                        resultss = senderDataAnswer.filter(item => !getDuplicateKey(nameWithDash).includes(item.key));
                    }
                }

                return resultss
            }

            let mappingQuestionFix = []
            for (let x = 0; x < mappingQuestion.length; x++) {
                let found = false
                for (let y = 0; y < mappingQuestionFix.length; y++) {
                    if (getOriginalName(mappingQuestion[x].name) == getOriginalName(mappingQuestionFix[y].name)) {
                        found = true
                        break
                    }
                }
                if (!found) {
                    mappingQuestionFix.push(mappingQuestion[x])
                }
            }

            let mappingAnswerFix = replaceSameNameAnswer(answerObjToArr)

            for (let i = 0; i < mappingQuestionFix.length; i++) {
                let findByName = mappingAnswerFix.find((d) => getOriginalName(d.key) == mappingQuestionFix[i].name)

                if (findByName) {
                    mappingQuestionFix[i].name = findByName.key

                    if (mappingQuestionFix[i].type == 'checkbox') {
                        mappingQuestionFix[i].value = findByName?.value?.join('~');
                    } else if (mappingQuestionFix[i].type == 'tagbox') {
                        mappingQuestionFix[i].value = findByName?.value?.join('~');
                    } else {
                        mappingQuestionFix[i].value = findByName.value
                    }


                }
            }

            let finalResult = {
                informasi_lokasi: {
                    provinsi_id: sender.data?.province_id,
                    kabkota_id: sender.data?.kabkota_id,
                    kecamatan_id: sender.data?.kecamatan_id,
                    alamat_detail: sender.data?.alamat_detail,
                },
                kode: sender.jsonObj.kode,
                data: mappingQuestionFix,
            }
            storeSurveyDinamis(finalResult).then((res) => {
                alert('data survey berhasil di simpan')
            }).catch((error) => {
                apiClient.post(`/log-fe`, {
                    error: `ERROR FE SUBMIT SURVEY - message: ${error?.message} - code: ${error?.code} - stack: ${error?.stack} name: ${error?.name}`
                })
                alert('data survey gagal di simpan')
            })


        } catch (error) {
            apiClient.post(`/log-fe`, {
                error: `ERROR FE SUBMIT SURVEY - message: ${error?.message} - code: ${error?.code} - stack: ${error?.stack} name: ${error?.name}`
            })

            alert(`uppss error ${error}`)
        }

    });



    return (<Survey model={survey} />);
}

export default SurveyComponent;