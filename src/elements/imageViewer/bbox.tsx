import { Popover } from 'antd';
import react from 'react'
import { Typography } from 'antd';

interface IBbox{
    x: number;
    y: number;
    width: number;
    height: number;
    type: "Грамматическая" | "Пропуск слова" | "Иное"
}

const colors = {
    "Грамматическая": {
        'backColor': 'rgba(255, 77, 79, 0.31)',
        'borderColor': 'rgba(255, 77, 79, 1)'
    },
    "Пропуск слова": {
        'backColor': 'rgba(22, 119, 255, 0.31)',
        'borderColor': 'rgba(22, 119, 255, 1)'
    },
    "Иное": {
        'backColor': 'rgba(190, 200, 200, 0.31)',
        'borderColor': 'rgba(190, 200, 200, 0.31)'
    }
}

interface IPopoverContent{
    referenceName: string;
    type: "Грамматическая" | "Пропуск слова" | "Иное"
}

const PopoverContent: react.FC<IPopoverContent> = (props) => {
    return <div>
        <Typography.Text>
            Тип ошибки: <span 
                style={{color: colors[props.type].borderColor}}>
                    {props.type}
                </span>
        </Typography.Text>
        <br />
        <Typography.Text>
            Эталонный заголовок: {props.referenceName}
        </Typography.Text>
    </div>
}


export const Bbox: react.FC<IBbox> = (props) => {
    const bbox_popover = <PopoverContent type={props.type} referenceName='Рога и копыта'/>

    return <div style={{
        height: 0
    }}>
        <Popover title='Заголовок' content={bbox_popover}>
            <div style={{
                position: 'relative',
                left: props.x,
                top: props.y,
                width: props.width,
                height: props.height,
                backgroundColor: colors[props.type].backColor,
                border: `1px solid ${colors[props.type].borderColor}`,
                cursor: 'pointer'
            }}></div>
        </Popover>
        
   </div> 
}