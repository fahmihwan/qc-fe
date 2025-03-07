import React, { useState } from 'react'
import { Model } from 'survey-core';
import { localization, VisualizationManager, VisualizationPanel, VisualizerBase } from 'survey-analytics';
import { useEffect } from 'react';
import { div } from 'framer-motion/client';

export const ExampleChart = () => {

    useEffect(() => {
        const observer = new MutationObserver(() => {
            const elements = document.getElementsByClassName("sa-question__content");
            if (elements.length > 0) {
                for (let i = 0; i < elements.length; i++) {
                    // elements[i].style.background = "linear-gradient(to top, #1d1e24, #2e2e30)";
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
        "no": 1,
        "title": "Statistik Luas Panen (Padi)",
        "kode": "foodestate-padi-statistikluaspanen",
        "logoPosition": "right",
        "pages": [
            {
                "name": "page2",
                "title": "Statistik Luas Lahan",
                "elements": [
                    {
                        "type": "text",
                        "name": "question1",
                        "title": "Total luas lahan padi dalam satuan hektar (ha)",
                        "isRequired": true,
                        "inputType": "number"
                    },
                    {
                        "type": "radiogroup",
                        "name": "question2",
                        "title": "Status Kepemilikan Lahan",
                        "isRequired": true,
                        "choices": [
                            {
                                "value": "Milik Pribadi",
                                "text": "Milik Pribadi"
                            },
                            {
                                "value": "Sewa",
                                "text": "Sewa"
                            },
                            {
                                "value": "Hak Guna Usaha (HGU)",
                                "text": "Hak Guna Usaha (HGU)"
                            },
                            {
                                "value": "Milik Pemerintah",
                                "text": "Milik Pemerintah"
                            }
                        ],
                        "showOtherItem": true
                    },
                    {
                        "type": "boolean",
                        "name": "question3",
                        "title": "Apakah lahan ini termasuk dalam program Food Estate?",
                        "isRequired": true,
                        "labelTrue": "Iya",
                        "labelFalse": "Tidak"
                    },
                    {
                        "type": "radiogroup",
                        "name": "question4",
                        "title": "Jenis lahan yang digunakan untuk padi",
                        "isRequired": true,
                        "choices": [
                            {
                                "value": "Sawah irigasi teknis",
                                "text": "Sawah irigasi teknis"
                            },
                            {
                                "value": "Sawah tadah hujan",
                                "text": "Sawah tadah hujan"
                            },
                            {
                                "value": "Lahan rawa/pasang surut",
                                "text": "Lahan rawa/pasang surut"
                            },
                            {
                                "value": "Lahan kering/tegalan",
                                "text": "Lahan kering/tegalan"
                            }
                        ],
                        "showOtherItem": true
                    },
                    {
                        "type": "radiogroup",
                        "name": "question5",
                        "title": "Apakah ada peningkatan atau penurunan  produktivitas dibanding tahun sebelumnya?",
                        "isRequired": true,
                        "choices": [
                            {
                                "value": "Ya (meningkat)",
                                "text": "Ya (meningkat)"
                            },
                            {
                                "value": "Ya (menurun)",
                                "text": "Ya (menurun)"
                            },
                            {
                                "value": "tidak",
                                "text": "Tidak"
                            }
                        ],
                        "separateSpecialChoices": true
                    },
                    {
                        "type": "text",
                        "name": "question5-Inputopsi-ya_meningkat",
                        "visibleIf": "{question5} = 'Ya (meningkat)'",
                        "title": "Jika pilih Ya (meningkat) (kuintal/ha)",
                        "isRequired": true,
                        "inputType": "number"
                    },
                    {
                        "type": "text",
                        "name": "question5-Inputopsi-ya_menurun",
                        "visibleIf": "{question5} = 'Ya (menurun)'",
                        "title": "Jika pilih Ya (menurun) (kuintal/ha)",
                        "isRequired": true,
                        "inputType": "number"
                    },
                    {
                        "type": "radiogroup",
                        "name": "question6",
                        "title": "Jika ada perubahan, apa penyebabnya?",
                        "isRequired": true,
                        "choices": [
                            {
                                "value": "Alih fungsi lahan ke non-pertanian",
                                "text": "Alih fungsi lahan ke non-pertanian"
                            },
                            {
                                "value": "Perluasan lahan tanam",
                                "text": "Perluasan lahan tanam"
                            },
                            {
                                "value": "Penyusutan akibat bencana alam (banjir, kekeringan, longsor, dll.)",
                                "text": "Penyusutan akibat bencana alam (banjir, kekeringan, longsor, dll.)"
                            }
                        ],
                        "showOtherItem": true
                    }
                ]
            }
        ]
    }


    const surveyResults = [{
        "question1": 20,
        "question2": "Milik Pribadi",
        "question3": false,
        "question4": 'Sawah irigasi teknis',
        "question5": 'Ya (meningkat)',
        "question5-Inputopsi-ya_meningkat": 25,
        "question5-Inputopsi-ya_menurun": 30,
        "question6": "Alih fungsi lahan ke non-pertanian"

    }, {
        "question1": 30,
        "question2": "Milik Pribadi",
        "question3": false,
        "question4": 'Lahan rawa/pasang surut',
        "question5": 'Ya (menurun)',
        "question5-Inputopsi-ya_meningkat": 2,
        "question5-Inputopsi-ya_menurun": 3,
        "question6": "Perluasan lahan tanam"
    }, {
        "question1": 3,
        "question2": "Hak Guna Usaha (HGU)",
        "question3": true,
        "question4": 'Sawah tadah hujan',
        "question5": 'tidak',
        "question5-Inputopsi-ya_meningkat": 2,
        "question5-Inputopsi-ya_menurun": 50,
        "question6": "Penyusutan akibat bencana alam (banjir, kekeringan, longsor, dll.)"
    }, {
        "question1": 20,
        "question2": "Hak Guna Usaha (HGU)",
        "question3": true,
        "question4": 'Lahan rawa/pasang surut',
        "question5": 'tidak',
        "question5-Inputopsi-ya_meningkat": 10,
        "question5-Inputopsi-ya_menurun": 100,
        "question6": "other"
    }, {
        "question1": 20,
        "question2": "Hak Guna Usaha (HGU)",
        "question3": true,
        "question4": 'Lahan rawa/pasang surut',
        "question5": 'Ya (meningkat)',
        "question5-Inputopsi-ya_meningkat": 5,
        "question5-Inputopsi-ya_menurun": 30,
        "question6": "Alih fungsi lahan ke non-pertanian"
    }];



    function TotalLandAreaVisualizer(question, data, options) {
        // Step 1: Update getData function to calculate the total area from 'question1'
        function getData(visualizer) {
            let totalArea = 0;
            let counter = 0;

            // Fokus hanya pada 'question1'
            visualizer.surveyData.forEach(dataObj => {
                if (dataObj["question1"]) {
                    const area = parseFloat(dataObj["question1"]);

                    // Validasi apakah area adalah angka
                    if (!isNaN(area)) {
                        totalArea += area;
                        counter++;
                    }
                }
                if (dataObj["question5-Inputopsi-ya_meningkat"]) {
                    const area = parseFloat(dataObj["question5-Inputopsi-ya_meningkat"]);

                    // Validasi apakah area adalah angka
                    if (!isNaN(area)) {
                        totalArea += area;
                        counter++;
                    }
                }
                if (dataObj["question5-Inputopsi-ya_menurun"]) {
                    const area = parseFloat(dataObj["question5-Inputopsi-ya_menurun"]);

                    // Validasi apakah area adalah angka
                    if (!isNaN(area)) {
                        totalArea += area;
                        counter++;
                    }
                }
            });

            return totalArea;  // Mengembalikan total luas lahan yang dihitung
        }

        // Step 2: Implement a rendering function with styling and display for 'question1'
        function renderContent(contentContainer, visualizer) {
            const totalArea = getData(visualizer);

            // Render HTML for total land area of 'question1'
            const totalHtml = `
            <div class="visualizer-content">
              <span class="visualizer-label">
                Total Luas Lahan Padi (hektar) untuk Semua Responden: 
              </span>
              <span class="visualizer-value" style="color: blue;">
                ${totalArea.toFixed(2)} ha
              </span>
            </div>
          `;
            contentContainer.insertAdjacentHTML("beforeend", totalHtml);
        }

        // Step 3: Instantiating the visualizer for 'question1' and render custom content
        return new VisualizerBase(
            question,
            data,
            { renderContent: renderContent, dataProvider: options.dataProvider },
            "total-land-area"
        );
    }

    // Step 4: Register the visualizer only for 'question1' (Text Input)
    VisualizationManager.registerVisualizer("number", TotalLandAreaVisualizer, 0);

    // Step 5: Localization - set the visualizer's display name for 'question1'
    localization.locales["en"]["visualizer_total-land-area"] = "Total Land Area (in hectares) for All Respondents";


    const vizPanelOptions = {
        allowHideQuestions: true
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

        // vizPanel.color = 'red'
        // vizPanel.backgroundColor = "transparent"
        // vizPanel.showToolbar = false;

        setVizPanel(vizPanel);
    }



    useEffect(() => {
        vizPanel.render("surveyVizPanel");
        return () => {
            document.getElementById("surveyVizPanel").innerHTML = "";
        }
    }, [vizPanel]);


    return (
        <div className=''>
            <div id="surveyVizPanel" />
        </div>
    )
}

// style={{ backgroundColor: "red" }}
// style={{ backgroundColor: "linear-gradient(to right, #FF7E5F, #feb47b)" }} 