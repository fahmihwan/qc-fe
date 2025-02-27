import React, { useState } from 'react'
import { Model } from 'survey-core';
import { VisualizationPanel, VisualizerBase } from 'survey-analytics';
import { useEffect } from 'react';

export const ExampleChart = () => {

    useEffect(() => {
        const observer = new MutationObserver(() => {
            const elements = document.getElementsByClassName("sa-question__content");
            if (elements.length > 0) {
                for (let i = 0; i < elements.length; i++) {
                    elements[i].style.background = "linear-gradient(to top, #1d1e24, #2e2e30)";
                    // elements[i].style.color = "white";
                }
                observer.disconnect();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        return () => {
            observer.disconnect();
        };
    }, []);

    // VisualizerBase.customColors = [
    //     // "#f3cec9",
    //     // "#e7a4b6",
    //     // "#cd7eaf",
    //     // "#a262a9",
    //     // "#6f4d96",
    //     "#3d3b72",
    //     // "#182844",
    //     // "#6f4d96",
    //     // "#3d3b72",
    //     // "#182844",
    // ];




    // vizPanel.showHeader = false;
    // vizPanel.backgroundColor = "gray";
    // vizPanel.render(this.elem?.nativeElement);


    const surveyJson = {
        elements: [{
            name: "satisfaction-score",
            title: "ini coooo?",
            type: "radiogroup",
            choices: [
                { value: 5, text: "Fully satisfying" },
                { value: 4, text: "Generally satisfying" },
                { value: 3, text: "Neutral" },
                { value: 2, text: "Rather unsatisfying" },
                { value: 1, text: "Not satisfying at all" }
            ],
            isRequired: true
        }, {
            name: "nps-score",
            title: "On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?",
            type: "rating",
            rateMin: 0,
            rateMax: 10,
        }],
        showQuestionNumbers: "off",
        completedHtml: "Thank you for your feedback!",
    };

    const surveyResults = [{
        "satisfaction-score": 2,
        "nps-scorescore": 10
    }, {
        "satisfaction-score": 3,
        "nps-score": 9
    }, {
        "satisfaction-score": 9,
        "nps-score": 6
    }, {
        "satisfaction-score": 3,
        "nps-score": 6
    }, {
        "satisfaction-score": 2,
        "nps-score": 3
    }];



    const vizPanelOptions = {
        allowHideQuestions: false
    }


    const [survey, setSurvey] = useState(null);
    const [vizPanel, setVizPanel] = useState(null);
    if (!survey) {
        const survey = new Model(surveyJson);
        setSurvey(survey);
    }

    if (!vizPanel && !!survey) {
        const vizPanel = new VisualizationPanel(
            survey.getAllQuestions(),
            surveyResults,
            vizPanelOptions
        );

        vizPanel.color = 'red'
        vizPanel.backgroundColor = "transparent"
        vizPanel.showToolbar = false;

        setVizPanel(vizPanel);
    }



    useEffect(() => {
        vizPanel.render("surveyVizPanel");
        return () => {
            document.getElementById("surveyVizPanel").innerHTML = "";
        }
    }, [vizPanel]);


    return (
        <div id="surveyVizPanel" />
    )
}

// style={{ backgroundColor: "red" }}
// style={{ backgroundColor: "linear-gradient(to right, #FF7E5F, #feb47b)" }} 