

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

    console.log(surveyJson);
    const survey = new Model(surveyJson);


    survey.applyTheme(SurveyTheme.DefaultDark);

    survey.onComplete.add((sender, options) => {


        let getPagesJson = sender.jsonObj.pages;
        console.log(sender.data);
        let arrConcat = []
        for (let i = 0; i < getPagesJson.length; i++) {
            const getElements = getPagesJson[i].elements
            for (let j = 0; j < getElements.length; j++) {
                let concatText = `${getElements[j].title}~${getElements[j].no}`
                arrConcat.push(concatText);
            }
        }

        let duplicateSender = sender.data;



        const senderData = Object.entries(sender.data).map(([key, value]) => ({ key, value }));
        if (arrConcat.length == senderData.length) {
            for (let x = 0; x < senderData.length; x++) {

                duplicateSender[senderData[x].key] = `${duplicateSender[senderData[x].key]}`
                if (`${duplicateSender[senderData[x].key]}`.includes('~')) {
                    duplicateSender[senderData[x].key] = `${duplicateSender[senderData[x].key]}`.split('~').join('-')
                }
                duplicateSender[senderData[x].key] = `${duplicateSender[senderData[x].key]}~${arrConcat[x]}`

            }

            let payload = {
                title: sender.jsonObj.title,
                kode: sender.jsonObj.kode,
                // core: {
                //     kode: sender.jsonObj.kode,
                // },
                data: duplicateSender
            }
            storeSurveyDinamis(payload)
        } else {
            alert('terdapat kesalahan mapping survey')
        }
    });
    return (<Survey model={survey} />);
}

export default SurveyComponent;