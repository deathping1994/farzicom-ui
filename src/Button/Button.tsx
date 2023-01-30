import React from 'react'
import * as S from "./style";

export default function ({ title }: {title: string}) {
    return (
        <S.Button className="UI-Button">{title}</S.Button>
    )
}