

import statistikLuasPanen from './foodestate/statistikLuasPanen.json'
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import * as SurveyTheme from "survey-core/themes";;
import { storeSurveyDinamis } from '../../../api/survey';



function SurveyComponent() {
    const survey = new Model(statistikLuasPanen);
    survey.applyTheme(SurveyTheme.DefaultDark);



    survey.onComplete.add((sender, options) => {
        console.log(sender);
        let payload = {
            title: sender.jsonObj.title,
            kode: sender.jsonObj.kode,
            core: {
                kode: sender.jsonObj.kode,
            },
            data: sender.data
        }
        storeSurveyDinamis(payload)
    });
    return (<Survey model={survey} />);
}

export default SurveyComponent;