import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { datePickerHandler } from '../../redux/actions/actions';
import DatePickerBox, { registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import styled from 'styled-components';
import calendar from '../../images/calendar_ic.svg';
import calendarHover from '../../images/calendar_ic_hover.svg';
import { getDateData } from '../../redux/actions/actions';
registerLocale('ko', ko);

function DatePicker({ curDate, setCurDate }) {
    
    // const dispatch = useDispatch();
    // const [curDate, setCurDate] = useState(new Date());
    // console.log(curDate.getMonth()+1,'월', curDate.getDate(),'일')
    
    // propSetCurDate(curDate);
    // useEffect(() => {
    //     // dispatch(getDateData(curDate));
    // }, [curDate]);

    return (
        <StyledDatePicker
            locale='ko'
            selected={curDate}
            onChange={(date) => setCurDate(date)} 
            // open={isOpenDatePicker}
            showPopperArrow={false}
            dateFormat="MM월 dd일"
            maxDate={new Date()}
        />
    )
}

export default DatePicker

const StyledDatePicker = styled(DatePickerBox)` // datepicker date만 css // 달력 css 추후 작업
    font-size: 2.2em;
    width: 6em;
    margin: 0.2em 0.5em;
    line-height: 1.5;
    border: none;
    text-align: right;
    color: #17191d;
    font-family: NotoSansKRKR;
    letter-spacing: 0.02em;
    background-image: url(${calendar});
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;
    :hover {
        background-image: url(${calendarHover});
    }
`
