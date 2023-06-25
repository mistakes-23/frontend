import React, { useState } from 'react';
import { getFile, getStatus } from '../../client';
import { useNavigate, useParams } from 'react-router-dom';
import { ImageViewer } from '../../elements/imageViewer';
import {message, Progress, Typography, Collapse} from 'antd';
import type { CollapseProps } from 'antd';

import './style.css'

interface IResoltCollapse{
    shortAnalytics: React.ReactNode;
    numberBigAnalytics: number;
    stringBigAnalytics: string;
}

const ResultCollapse: React.FC<IResoltCollapse> = (props) => {


    const items: CollapseProps['items'] = [
        {
          key: '1',
          label: 'Краткая аналитика',
          children: props.shortAnalytics,
        },
        {
          key: '2',
          label: 'Подбробная аналитика',
          children: <Progress 
                percent={props.numberBigAnalytics}
                format={(percent) => {return props.stringBigAnalytics}}
                type='circle'
            ></Progress>,
        },
      ];
    return <Collapse items={items}></Collapse>
}


export function Result() {
    const [images, setImages] = useState([]);
    const queried = React.useRef(false);
    const {id} = useParams<{id: string}>();
    const [messageApi, contextHolder] = message.useMessage();
    const [status, setStatus] = React.useState(-1);
    const [statusStr, setStatusStr] = React.useState('');
    const [namePapers, setNamePapers] = React.useState([]);
    const [bboxes, setBboxes] = React.useState([]);
    const [isError, setIsError] = React.useState(false);
    const [featuresLoaded, setFeatureLoaded] = React.useState(false);
    const [featuresElem, setFeaturesElem] = React.useState<React.ReactNode>(null);

    if (status == -1) {
        getStatus(localStorage.getItem('statusId') as string).then((e) => {
            setStatus(e.data.processed / e.data.total);
            setStatusStr(`${e.data.processed} / ${e.data.total}`)
        })
    }
    else if (status != 1) {
        setTimeout(() => {
            getStatus(localStorage.getItem('statusId') as string).then((e) => {
                setFeatureLoaded(e.data.features_loaded);
                if (e.data.features_loaded && featuresElem == null) {
                    getFile(id as string).then((ee) => {
                        setFeaturesElem(ee.data.text_locations.map((text: any) => {
                            return <div>Страница: {text.page} - {text.raw_text}</div>
                        }))
                    })
                }
                if (e.data.error) {
                    messageApi.error(e.data.error_description);
                    setIsError(true);
                }
                setStatus(e.data.processed / e.data.total);
                setStatusStr(`${e.data.processed} / ${e.data.total}`)
            })
        }, 5000)
    }

    if (!queried.current && status == 1 && !isError) {
        queried.current = true;
        getFile(id as string).then((e) => {
            setImages(e.data.images.map((img: any) => {
                return 'https://' + img.image.split('http://')[1]
            }));
            setNamePapers(e.data.text_locations.map((e: any) => {
                return e.page - 1
            }))
            setBboxes(e.data.text_locations.map((e: any) => {
                return {
                    page: e.page - 1,
                    bbox: e.coordinates
                }
            }))
        });
    }


    return (
        status != 1 && !featuresLoaded ?
        <div className='progress-centered'>
            <Typography.Title level={2}>
                Файл обрабатывается
            </Typography.Title>
            <Progress 
                percent={status * 100}
                format={(percent) => {return statusStr}}
                type='circle'
            ></Progress>
            <Typography.Title level={4}>
                Страниц загружено
            </Typography.Title>
            
        </div> : 
        featuresLoaded && status != 1 ? 
        <div>
            <ResultCollapse
                shortAnalytics={featuresElem}
                numberBigAnalytics={status * 100}
                stringBigAnalytics={statusStr}
            ></ResultCollapse>
        </div> :
        <>
            {contextHolder}
            <div>

                <ImageViewer 
                    images={images} 
                    headIndexes={namePapers}
                    bboxes={bboxes}
                ></ImageViewer>
            </div>
        </>
  );
}