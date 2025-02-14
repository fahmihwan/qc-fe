

// import statistikLuasPanen from './foodestate/statistikLuasPanen.json'
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import * as SurveyTheme from "survey-core/themes";;
import { storeSurveyDinamis } from '../../../api/survey';
import dataFormListSurvey from './../../../data/dataFormListSurvey.json'




function SurveyComponent() {



    const survey = new Model(dataFormListSurvey.listFormSurvey[0]);

    survey.applyTheme(SurveyTheme.DefaultDark);

    survey.onComplete.add((sender, options) => {
        let getPagesJson = sender.jsonObj.pages
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