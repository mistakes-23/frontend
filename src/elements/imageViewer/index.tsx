import react from 'react'
import {Button, Typography} from 'antd';
import './style.css';
import { Bbox } from './bbox';


interface IImageViewer {
    images: string[];
    headIndexes: number[];
    bboxes: {
        page: number,
        bbox: number[]
    }[]
}

export const ImageViewer: react.FC<IImageViewer> = (props) => {
    const [index, setIndex] = react.useState(0);
    const [headIndex, setHeadIndex] = react.useState(-1);
    const headIndexes = props.headIndexes;
    const bboxes = props.bboxes;
    const image = react.useRef(null);
    const imageHeight = 800;
    const [imageWidth, setImageWidth] = react.useState(0)
    
    var bbox: any = [];
    bboxes.map((e) => {
        if (e.page == index) {
            bbox.push(e.bbox)
        }
    })

    react.useEffect(() => {
        console.log((image.current as any).width);
        setImageWidth((image.current as any).width);
    });


    return <div className="centered">
        <div className='image__container'>
            {
                bbox.map((e: any) => {
                    console.log(e[2] * imageWidth)
                    return <Bbox 
                        x={e[0] * imageWidth}
                        y={800 - e[1] * 800 - e[3] * imageHeight}
                        width={e[2] * imageWidth}
                        height={e[3] * imageHeight}
                        type='Грамматическая'
                    ></Bbox>
                })
            }
            <img src={props.images[index]} alt="" height={800} ref={image} />
            <div className='controll__container'>
                <Button shape={'circle'} onClick={() => {
                    setIndex(Math.max(index-1, 0));
                }}>{"<"}</Button>
                <Button shape={'round'} onClick={() => {
                    var index = (headIndex + 1) % headIndexes.length
                    setHeadIndex(index);
                    setIndex(headIndexes[index]);
                }}>Следующий заголовок</Button>
                <Button shape={'circle'} onClick={() => {
                    setIndex(Math.min(props.images.length-1, index+1));                
                }}>{">"}</Button>
            </div>
            <div className="pagination">
                <Typography.Text style={{'textAlign': 'center'}}>
                    {index+1} / {props.images.length}
                </Typography.Text>
            </div>
        </div>
    </div>
}