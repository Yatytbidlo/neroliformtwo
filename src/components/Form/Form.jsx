import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [phone, setPhone] =
        useState('')
    const [perfume, setPerfume] = useState('')
    const [volume, setVolume] = useState('')
    // const [neroligrape, setNeroliGrape] = useState('')
    // const [lalique, setLalique] = useState('')
    // const [jimmychoo, setJimmyChoo] = useState('')
    // const [jimmychoointense, setJimmyChooIntense] = useState('')

    const {tg} = useTelegram()

    const onSendData = useCallback(() => {
        const data = {
            name,
            city,
            phone,
            perfume,
            volume,
        }
        tg.sendData(JSON.stringify(data))
    }, [name, city, phone, perfume, volume])

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
        if (!name || !phone || !city || !perfume || !volume) {
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

    const onChangePerfume = (e) => {
        setPerfume(e.target.value)
    }

    const onChangeVolume =(e) => {
        setVolume(e.target.value)
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
            <select value = {perfume} onChange={onChangePerfume} className={'select'}>
                <option>Выберите парфюм</option>
                <option value = {'neroli'}>Neroli</option>
                <option value = {'neroli grape'}>Neroli Grape</option>
                <option value = {'lalique'}>Encre Noire Lalique</option>
                <option value = {'jimmy choo man'}>Jimmy Choo Man</option>
                <option value = {'jimmy choo intense'}>Jimmy Choo Man Intense</option>
            </select>

            <select value = {volume} onChange={onChangeVolume} className={'select'}>
                <option>Выберите объём</option>
                <option value = {'1мл'}>1мл</option>
                <option value = {'30мл'}>30мл</option>
                <option value = {'50мл'}>50мл</option>
                <option value = {'100мл'}>100мл</option>
            </select>

        </div>
    );
};

export default Form;