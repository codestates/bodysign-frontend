import { NextPage } from 'next'
import React, { useState } from 'react'
import Layout from '../components/Layout'
import { SubmitHandler, useForm } from 'react-hook-form'
import 'react-datepicker/dist/react-datepicker.css'
import { gql, useMutation, useReactiveVar } from '@apollo/client'
import { loginTypeVar, modalVar } from '../graphql/vars'
import { useRouter } from 'next/dist/client/router'
import {
	CreateTrainerDocument,
	CreateUserDocument
} from '../graphql/graphql'

interface FormInput {
	email: string
	password: string
	name: string
	birth: string
	phone: string
	loginType: string
	gender: string
}

const labelProperties =
	'after:absolute after:h-full after:bg-yellow-100 after:w-full after:top-0 after:z-[-1] after:transition-[left] after:duration-500 peer-checked:cursor-default peer-checked:text-black peer-checked:after:left-0'

const Signup: NextPage = () => {
	const router = useRouter()
	const [areYouTrainer, setAreYouTrainer] = useState(true)
	const [exerciseTypes, setExerciseTypes] = useState([
		{ id: 0, name: 'PT샵', status: false },
		{ id: 1, name: '헬스장', status: false },
		{ id: 2, name: '크로스핏', status: false },
		{ id: 3, name: '요가', status: false },
		{ id: 4, name: '필라테스', status: false },
		{ id: 5, name: '기타', status: false }
	])
	const [checkedPersonalInfo, setCheckedPersonalInfo] = useState(false)
	const loginType = useReactiveVar(loginTypeVar)
	const modal = useReactiveVar(modalVar)
	const [createTrainerUser] = useMutation(
		areYouTrainer ? CreateTrainerDocument : CreateUserDocument
	)

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<FormInput>()
	const onSubmit: SubmitHandler<FormInput> = async data => {
		// exerciseTypes 필드 추가되면 인풋에 추가한다.
		const input = {
			email: data.email,
			userName: data.name,
			password: data.password,
			phoneNumber: data.phone,
			gender: data.gender,
			// birthDate: new Date(data.birth),
			loginType
		}
		try {
			areYouTrainer
				? await createTrainerUser({
						variables: {
							createTrainerInput: { ...input }
						}
				  })
				: await createTrainerUser({
						variables: {
							createUserInput: { ...input }
						}
				  })
			router.push('/')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Layout variant="Web">
				<div className="flex flex-col mx-4 my-5 text-[12px]">
					<div className="text-[20px] text-center">회원가입</div>

					<form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
						<div>
							<label>이메일</label>
							<input
								className="w-full h-12 p-3 mt-1 border"
								type="text"
								{...register('email', {
									required: true,
									pattern:
										/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/
								})}
							/>
							{errors.email && (
								<div className="text-[16px] text-red-500 mt-1 text-center">
									이메일 형식을 지켜주세요.
								</div>
							)}
						</div>

						<div className="mt-4">
							<label>비밀번호</label>
							<input
								className="w-full h-12 p-3 mt-1 border"
								type="password"
								{...register('password', {
									required: true,
									minLength: 8
								})}
							/>
							{errors.password?.type === 'minLength' && (
								<div className="text-[16px] text-red-500 mt-1 text-center">
									비밀번호는 최소 8자 이상으로 입력해주세요.
								</div>
							)}
						</div>

						<div className="mt-4">
							<label>이름</label>
							<input
								className="w-full h-12 p-3 mt-1 border"
								type="text"
								{...register('name', {
									required: true
								})}
							/>
						</div>

						<div className="mt-4">
							<label>생년월일</label>
							<input
								className="w-full h-12 p-3 mt-1 border"
								type="date"
								{...register('birth', {
									required: true
								})}
							/>
						</div>

						<div className="mt-4">
							<label>휴대폰 번호</label>
							<input
								className="w-full h-12 p-3 mt-1 border"
								type="text"
								{...register('phone', {
									required: true,
									pattern: /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/
								})}
							/>
							{errors.phone && (
								<div className="text-[16px] text-red-500 mt-1 text-center">
									붙임표(-)는 제외하고 입력해주세요.
								</div>
							)}
						</div>

						<div className="mt-4">
							<span>
								<input
									className="hidden peer"
									type="radio"
									id="male"
									value="male"
									defaultChecked
									{...register('gender', {
										required: true
									})}
								/>
								<label
									className={`${labelProperties} w-[208px] text-center p-3 inline-block relative border border-r-0 cursor-pointer after:left-full`}
									htmlFor="male">
									남성
								</label>
							</span>
							<span>
								<input
									className="hidden peer"
									type="radio"
									id="female"
									value="female"
									{...register('gender', {
										required: true
									})}
								/>
								<label
									className={`${labelProperties} w-[208px] text-center p-3 inline-block relative border border-l-0 cursor-pointer after:-left-full`}
									htmlFor="female">
									여성
								</label>
							</span>
						</div>

						<div className="mt-4">
							<span>
								<input
									className="hidden peer"
									type="radio"
									id="trainer"
									value="trainer"
									defaultChecked
									{...register('loginType', {
										required: true
									})}
									onClick={() => setAreYouTrainer(true)}
								/>
								<label
									className={`${labelProperties} w-[208px] text-center p-3 inline-block relative border border-r-0 cursor-pointer after:left-full`}
									htmlFor="trainer">
									트레이너
								</label>
							</span>
							<span>
								<input
									className="hidden peer"
									type="radio"
									id="user"
									value="user"
									{...register('loginType', {
										required: true
									})}
									onClick={() => setAreYouTrainer(false)}
								/>
								<label
									className={`${labelProperties} w-[208px] text-center p-3 inline-block relative border border-l-0 cursor-pointer after:-left-full`}
									htmlFor="user">
									회원
								</label>
							</span>
						</div>

						{areYouTrainer ? (
							<div className="flex flex-col mt-4">
								<div className="text-center">
									Pick a few types that you're interested in.
								</div>
								<div className="flex flex-wrap justify-between py-2">
									{exerciseTypes.map(type => {
										return (
											<React.Fragment key={type.id}>
												<span
													className={`p-1 ring-1 ring-green-200 flex items-center ${
														exerciseTypes[type.id].status
															? 'bg-yellow-100 '
															: ''
													}`}
													data-id={type.id}
													onClick={e => {
														if (
															e !== null &&
															e.target instanceof HTMLElement
														) {
															const idx = Number(e.target.dataset.id)
															if (exerciseTypes[idx].status) {
																setExerciseTypes(
																	exerciseTypes.map(type => {
																		if (type.id === idx) {
																			type.status = false
																		}
																		return type
																	})
																)
															} else {
																setExerciseTypes(
																	exerciseTypes.map(type => {
																		if (type.id === idx) {
																			type.status = true
																		}
																		return type
																	})
																)
															}
														}
													}}>
													{exerciseTypes[type.id].status ? (
														<svg
															xmlns="http://www.w3.org/2000/svg"
															className="w-4 h-4 text-green-500"
															fill="none"
															viewBox="0 0 24 24"
															stroke="currentColor">
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M5 13l4 4L19 7"
															/>
														</svg>
													) : null}
													{type.name}
												</span>
											</React.Fragment>
										)
									})}
								</div>
							</div>
						) : null}

						<div className="flex items-center mt-4">
							<input
								className="mr-1"
								type="checkbox"
								onChange={e => {
									setCheckedPersonalInfo(e.target.checked)
								}}
							/>
							<p
								className="underline"
								onClick={() => {
									modalVar(true)
								}}>
								개인정보 수집 및 이용동의 (필수)
							</p>
						</div>

						<input
							className={`w-full h-12 mt-4 text-black bg-yellow-200 cursor-pointer disabled:opacity-50`}
							type="submit"
							disabled={checkedPersonalInfo ? false : true}
						/>
					</form>
				</div>

				{modal ? (
					<div className="fixed max-w-[450px] w-full bottom-0 overflow-auto h-full">
						<div
							className="fixed inset-0 z-[-1] bg-black opacity-20 "
							onClick={() => modalVar(false)}></div>
						<div className="bg-white flex z-[50] flex-col py-10">
							<div className="py-3 text-center text-[20px]">
								Bodysign 개인정보처리방침
							</div>

							<div className="px-3">
								<div className="font-semibold bg-gray-100">목적</div>
								<div className="mt-1 text-[12px]">
									Bodysign (이하 "서비스"라 합니다.)과 관련하여, 서비스와
									이용 고객 간에 서비스의 이용조건 및 절차, 서비스와 회원
									간의 권리, 의무 및 기타 필요한 사항을 규정
								</div>
							</div>

							<div className="px-3 mt-4">
								<div className="font-semibold bg-gray-100">
									처리 및 보유기간
								</div>
								<div className="mt-1 text-[12px]">
									{`<Bodysign>`}은 법령에 따른 개인정보 보유 이용기간 또는
									정보주체로부터 개인정보를 수집 시에 동의받은 개인정보
									보유 이용기간 내에서 개인정보를 처리 보유 (서비스
									종료시까지)
								</div>
							</div>

							<div className="px-3 mt-4">
								<div className="font-semibold bg-gray-100">
									개인정보 파기절차 및 파기방법
								</div>
								<div className="mt-1 text-[12px]">
									{`<Bodysign>`}은 개인정보 보유기간의 경과, 처리목적 달성
									등 개인정보가 불필요하게 되었을 때에는 지체없이 해당
									개인정보를 파기( {`<Bodysign>`}은 전자적 파일 형태롤 기록
									저장된 개인정보는 기록을 재생할 수 없도록 파기)
								</div>
							</div>

							<div className="px-3 mt-4">
								<div className="font-semibold bg-gray-100">
									개인정보 권리 & 의무 행사방법
								</div>
								<div className="mt-1 text-[12px]">
									정보 주체는 {`<Bodysign>`}에 대해 언제든지 개인정보 열람
									정정 삭제 처리정지 요구 등의 권리 행사 가능
								</div>
							</div>

							<div className="px-3 mt-4">
								<div className="font-semibold bg-gray-100">
									개인정보 보호책임자
								</div>
								<div className="mt-1 text-[12px]">
									<p>성명 : 김창동</p>
									<p>연락처 : 010-7204-6072</p>
								</div>
							</div>

							<div className="px-3 mt-4">
								<div className="font-semibold bg-gray-100">
									개인정보 처리항목
								</div>
								<div className="mt-1 text-[12px]">
									이메일, 비밀번호, 이름, 생년월일, 전화번호, 근무환경
								</div>
							</div>

							<div className="px-3 mt-4">
								<div className="font-semibold bg-gray-100">
									안정성 확보조치
								</div>
								<div className="mt-1 text-[12px]">
									개인정보 처리시스템 등의 접근권한 관리, 고유식별번호 등의
									암호화
								</div>
							</div>

							<div className="px-3 mt-4">
								<div className="font-semibold bg-gray-100">
									개인정보 처리방침 변경사항
								</div>
								<div className="mt-1 text-[12px]">
									개인정보 처리 방침은 2021.12.21 부터 시행
								</div>
							</div>

							<div className="px-3 mt-4">
								<div className="font-semibold bg-gray-100">
									개인정보의 열람청구를 접수 및 처리하는 부서
								</div>
								<div className="mt-1 text-[12px]">
									개인정보 보호책임자와 동일
								</div>
							</div>

							<div className="px-3 mt-4">
								<div className="font-semibold bg-gray-100">
									정보주체의 권익침해에 대한 구제방법
								</div>
								<div className="mt-1 text-[12px]">
									<ul className="ml-4 list-decimal">
										<li>
											개인정보분쟁조정위원회 : (국번없이) 1833-6972
											(www.kopico.go.kr)
										</li>
										<li>
											개인정보침해신고센터 : (국번없이) 118
											(privacy.kisa.or.kr)
										</li>
										<li>대검찰청 : (국번없이) 1301 (ww.spo.go.kr)</li>
										<li>
											경찰청 : (국번없이) 182 (cyberbureau.police.go.kr)
										</li>
									</ul>
								</div>
							</div>

							<div className="max-w-[450px] self-end mt-4 mr-3">
								<button
									className="px-4 py-3 bg-gray-100 border"
									onClick={() => modalVar(false)}>
									확인
								</button>
							</div>
						</div>
					</div>
				) : null}
			</Layout>
		</>
	)
}

export default Signup
