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

const AddMemberModal: NextPage = ({ addMemberModalHandler, searchMemberModalHandler }) => {

	return (
		<>
        <div onClick={addMemberModalHandler} className="modal-overlay absolute w-full h-full top-0 left-0 bg-black opacity-70 font-IBM font-thin"></div>
            <div className="modal-container text-center bg-white w-8/12 mx-auto rounded shadow-lg z-999 overflow-y-auto p-3">
                <Link href="/trainer/manage-member/add-member">
                    <div className="font-IBM font-thin text-[12px] rounded-lg border p-1 m-2 bg-gray-400 text-white">새로운 회원정보 등록</div>
                </Link>
                    <div onClick={searchMemberModalHandler} className="font-IBM font-thin text-[12px] rounded-lg border p-1 m-2">Bodysign에 가입된 회원</div>
		</div>
		</>
	)
}

export default AddMemberModal
