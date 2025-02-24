

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




function SurveyComponent() {
    // http://localhost:5173/survey-masyarakat?kodeqr=ea0a37f7-23da-4586-9422-5f8b76bfa6e4
    const { kodeqr } = useParams()

    const [surveyJson, setSurveyJson] = useState({})


    useEffect(() => {

        getDetailQRcode(kodeqr).then((res) => {
            let getJson = dataFormListSurvey.listFormSurvey.filter((d) => d.kode == res.data[0].kode_topik)
            if (getJson.length == 0) {
                alert('survey tidak ada')
            }
            setSurveyJson(getJson[0]);
        })

    }, [kodeqr])



    // let informasiLokasi = {
    //     "name": "page1",
    //     "title": "Informasi Lokasi",
    //     "elements": [
    //         {
    //             "type": "text",
    //             "name": "nama_desa_kelurahan",
    //             "title": "Nama Desa/ Kelurahan",
    //             "isRequired": true
    //         },
    //         {
    //             "type": "text",
    //             "name": "alamat_lengkap",
    //             "title": "Alamat Lengkap",
    //             "isRequired": true
    //         },
    //         {
    //             "type": "text",
    //             "name": "rt",
    //             "title": "RT",
    //             "isRequired": true
    //         },
    //         {
    //             "type": "text",
    //             "name": "rw",
    //             "title": "RW",
    //             "isRequired": true
    //         },
    //         {
    //             "type": "text",
    //             "name": "Kode_Pos",
    //             "title": "Kode Pos",
    //             "isRequired": true
    //         },
    //         {
    //             "type": "text",
    //             "name": "Kab_kota",
    //             "title": "Nama Kabupaten/Kota",
    //             "isRequired": true
    //         },
    //         {
    //             "type": "text",
    //             "name": "prov",
    //             "title": "Nama Provinsi",
    //             "isRequired": true
    //         },
    //         {
    //             "type": "text",
    //             "name": "gps",
    //             "title": "Koordinat GPS (Opsional)"
    //         }
    //     ]
    // }

    // useEffect(() => {
    //     let getJson = dataFormListSurvey.listFormSurvey.filter((d) => d.kode == 'foodestate-tebu-statistikluaspanen')

    //     if (getJson.length == 0) {
    //         alert('pertanyaan survey FE tidak ada')
    //         return false
    //     }
    //     setSurveyJson(getJson[0]);
    // }, [])

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
                const nameWithDash = senderDataAnswer.filter(item => item.key?.includes('-')) // ex : "Sawah irigasi teknis", "Sawah tadah hujan", "Lahan rawa/pasang surut", "Other (TEXT)"
                let result = []
                if (nameWithDash) {
                    result = senderDataAnswer.filter(item => !getDuplicateKey(nameWithDash).includes(item.key));
                }
                return result
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
                kode: sender.jsonObj.kode,
                data: mappingQuestionFix,
            }
            storeSurveyDinamis(finalResult)
            // console.log(finalResult);


        } catch (error) {
            alert('uppsss', error)
        }


        // let getPagesJson = sender.jsonObj.pages;
        // // console.log(getPagesJson);
        // let arrConcat = []
        // for (let i = 0; i < getPagesJson.length; i++) {
        //     const getElements = getPagesJson[i].elements
        //     for (let j = 0; j < getElements.length; j++) {
        //         let concatText = `${getElements[j].title}~${getElements[j].no}`
        //         arrConcat.push(concatText);
        //     }
        // }

        // let duplicateSender = sender.data;



        // const senderData = Object.entries(sender.data).map(([key, value]) => ({ key, value }));
        // if (arrConcat.length == senderData.length) {
        //     for (let x = 0; x < senderData.length; x++) {

        //         duplicateSender[senderData[x].key] = `${duplicateSender[senderData[x].key]}`
        //         if (`${duplicateSender[senderData[x].key]}`.includes('~')) {
        //             duplicateSender[senderData[x].key] = `${duplicateSender[senderData[x].key]}`.split('~').join('-')
        //         }
        //         duplicateSender[senderData[x].key] = `${duplicateSender[senderData[x].key]}~${arrConcat[x]}`

        //     }

        //     let payload = {
        //         title: sender.jsonObj.title,
        //         kode: sender.jsonObj.kode,
        //         // core: {
        //         //     kode: sender.jsonObj.kode,
        //         // },
        //         data: duplicateSender
        //     }
        //     // console.log(payload);
        //     // storeSurveyDinamis(payload)
        // } else {
        //     alert('terdapat kesalahan mapping survey')
        // }
    });
    return (<Survey model={survey} />);
}

export default SurveyComponent;