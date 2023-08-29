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

    const {tg} = useTelegram()

    const onSendData = useCallback(() => {
        const data = {
            name,
            city,
            phone,
            neroli,
            neroligrape,
            lalique
        }
        tg.sendData(JSON.stringify(data))
    }, [name, city, phone, neroli, neroligrape, lalique])

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
                <label value={neroli} onChange={onChangeNeroli}><input type="checkbox" />Aventus Creed</label>
                <label value={neroligrape} onChange={onChangeNeroliGrape}><input type="checkbox" />Tygar Bvlgari </label>
                <label value={lalique} onChangeNerol={onChangeLalique()}><input type="checkbox" />Encre Noire Lalique</label>
        </div>
    );
};

export default Form;