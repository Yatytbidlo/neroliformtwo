import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [phone, setPhone] =
        useState('')
    const [neroli, setNeroli] = useState('')
    const [neroligrape, setNeroliGrape] = useState('')
    const [lalique, setLalique] = useState('')
    const [jimmychoo, setJimmyChoo] = useState('')
    const [jimmychoointense, setJimmyChooIntense] = useState('')

    const {tg} = useTelegram()

    const onSendData = useCallback(() => {
        const data = {
            name,
            city,
            phone,
            neroli,
            neroligrape,
            lalique,
            jimmychoo,
            jimmychoointense
        }
        tg.sendData(JSON.stringify(data))
    }, [name, city, phone, neroli, neroligrape, lalique, jimmychoo, jimmychoointense])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    useEffect(() => {
        if (!name || !phone || !city) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show()
        }
    }, [name, phone, city])

    const onChangeName = (e) => {
        setName(e.target.value)
    }

    const onChangeCity = (e) => {
        setCity(e.target.value)
    }

    const onChangePhone = (e) => {
        setPhone(e.target.value)
    }

    const onChangeNeroli = (e) => {
        setNeroli(e.target.value)
    }

    const onChangeNeroliGrape = (e) => {
        setNeroliGrape(e.target.value)
    }

    const onChangeLalique = (e) => {
        setLalique(e.target.value)
    }

    const onChangeJimmyChoo = (e) => {
        setJimmyChoo(e.target.value)
    }

    const onChangeJimmyChooIntense = (e) => {
        setJimmyChooIntense(e.target.value)
    }


    return (
        <div className={'form'}>
            <h3>Заполните все поля для доставки</h3>
            <input className={'input'}
                   type='text'
                   placeholder={'Имя и фамилия'}
                   value={name}
                   onChange={onChangeName}
            />
            <input className={'input'}
                   type='text'
                   placeholder={"Город и адрес проживания"}
                   value={city}
                   onChange={onChangeCity}
            />
            <input className={'input'}
                   type='number'
                   placeholder={"Номер мобильного"}
                   value={phone}
                   onChange={onChangePhone}
            />

            <h4>Выберите парфюм</h4>
            <label value={neroli} onChange={onChangeNeroli}><input type="checkbox" value="neroli"/>Aventus Creed</label>
            <label value={neroligrape} onChange={onChangeNeroliGrape}><input type="checkbox" value="neroli grape"/>Tygar Bvlgari </label>
            <label value={lalique} onChange={onChangeLalique}><input type="checkbox" value="lalique"/>Encre Noire Lalique</label>
            <label value={jimmychoo} onChange={onChangeJimmyChoo}><input type="checkbox" value="jimmy choo"/>Jimmy Choo Man</label>
            <label value={jimmychoointense} onChange={onChangeJimmyChooIntense}><input type="checkbox" value="jimmy choo intense"/>Jimmy Choo Man Intense</label>
        </div>
    );
};

export default Form;