import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { modalVar } from '../../src/graphql/vars'
import { useReactiveVar } from '@apollo/client'

interface FormInput {
    session_date: string
    cost: string
    times: number
    permission: number
}

const AddMemberModal: NextPage = () => {

    const modal = useReactiveVar(modalVar)

    const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<FormInput>()
	const onSubmit: SubmitHandler<FormInput> = data => {
		let test = { ...data }
		console.log(test)
		// 세션 추가 API
	}

	return (
		<>
        <div className="modal-overlay absolute w-full h-full top-0 left-0 bg-black opacity-70 font-IBM font-thin"></div>
            <div className="modal-container item-center bg-white w-8/12 mx-auto rounded shadow-lg z-999 overflow-y-auto p-3">
                <div className="text-center items-center mb-2">
                    <div className="font-IBM font-thin text-[12px] rounded-lg border p-1 m-2 bg-gray-400 text-white">새로운 회원정보 등록</div>
                    <div className="font-IBM font-thin text-[12px] rounded-lg border p-1 m-2">Bodysign에 가입된 회원</div>
                </div>
		</div>
		</>
	)
}

export default AddMemberModal
