import { useReactiveVar } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import React, { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
	useCreateSocialTrainerMutation,
	useCreateSocialUserMutation,
	useCreateTrainerMutation,
	useCreateUserMutation
} from '../generated/graphql'
import { loginTypeVar, modalVar } from '../graphql/vars'

interface FormInput {
	email: string | undefined | string[]
	userName: string
	password: string
	phoneNumber: string
	gender: string
	birthDate: string
	loginType: string
}

const labelProperties =
	'after:absolute after:border after:h-[4.8rem] after:bg-[#FDAD00] after:p-[1.2rem] after:w-full after:-top-0 after:z-[-1] after:transition-[left] after:duration-500 after:rounded-[2rem] peer-checked:cursor-default peer-checked:text-black peer-checked:after:left-0'

const Signup: NextPage<FormInput> = () => {
	const router = useRouter()
	const queryLoginType = router.query.logintype
	const googleEmail = router.query.email
	const [areYouTrainer, setAreYouTrainer] = useState(true)
	const [interestedTypes, setInterestedTypes] = useState([
		{ id: 0, type: 'PT', name: 'PT샵', status: false },
		{ id: 1, type: 'Workout', name: '헬스장', status: false },
		{ id: 2, type: 'Crossfit', name: '크로스핏', status: false },
		{ id: 3, type: 'Yoga', name: '요가', status: false },
		{ id: 4, type: 'Pilates', name: '필라테스', status: false },
		{ id: 5, type: 'Etc', name: '기타', status: false }
	])
	const [checkedPersonalInfo, setCheckedPersonalInfo] = useState(false)
	const loginType = useReactiveVar(loginTypeVar)
	const modal = useReactiveVar(modalVar)
	const [createTrainer] = useCreateTrainerMutation()
	const [createUser] = useCreateUserMutation()
	const [createSocialTrainer] = useCreateSocialTrainerMutation()
	const [createSocialUser] = useCreateSocialUserMutation()

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<FormInput>()
	const onSubmit: SubmitHandler<FormInput> = async data => {
		const interestTypes = interestedTypes.filter(type => type.status)
		const test = []
		for (let i = 0; i < interestTypes.length; i++) {
			test.push(interestTypes[i].type)
		}

		if (queryLoginType === 'google') {
			try {
				areYouTrainer
					? await createSocialTrainer({
							variables: {
								createSocialTrainerInput: {
									email: googleEmail as string,
									userName: data.userName,
									gender: data.gender,
									interests: test,
									loginType
								}
							}
					  })
					: await createSocialUser({
							variables: {
								createSocialUserInput: {
									email: googleEmail as string,
									userName: data.userName,
									phoneNumber: data.phoneNumber,
									gender: data.gender,
									birthDate: new Date(data.birthDate),
									loginType
								}
							}
					  })
				router.push('/')
			} catch (error) {
				console.log(error)
			}
		} else {
			try {
				areYouTrainer
					? await createTrainer({
							variables: {
								createTrainerInput: {
									email: data.email as string,
									userName: data.userName,
									password: data.password,
									gender: data.gender,
									interests: test,
									loginType
								}
							}
					  })
					: await createUser({
							variables: {
								createUserInput: {
									email: data.email as string,
									userName: data.userName,
									password: data.password,
									phoneNumber: data.phoneNumber,
									gender: data.gender,
									birthDate: new Date(data.birthDate),
									loginType
								}
							}
					  })
				router.push('/')
			} catch (error) {
				console.log(error)
			}
		}

		// 1
		// alert('회원가입이 완료되었습니다.')
		// location.href = 'http://localhost:3000'
	}

	return (
		<>
			<div className={`${modal ? 'hidden' : ''}`}>
				<div className="text-[3.2rem] text-left font-bold">회원가입</div>
				<form
					className="mt-[2.4rem] text-[1.8rem]"
					onSubmit={handleSubmit(onSubmit)}>
					{queryLoginType === 'google' ? (
						<div>
							<label>이메일</label>
							<input
								className="w-full p-[1.2rem] mt-[0.4rem] text-gray-400 border outline-none h-[4.8rem] rounded-[2rem]"
								type="text"
								value={googleEmail}
								readOnly
							/>
						</div>
					) : (
						<>
							<div>
								<label>이메일</label>
								<input
									className="w-full p-[1.2rem] mt-[0.4rem] border shadow-md h-[4.8rem] rounded-[2rem]"
									type="text"
									disabled={loginType === 'google'}
									// defaultValue 소셜 회원가입 이메일
									{...register('email', {
										required: true,
										pattern:
											/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/
									})}
								/>
								{errors.email && (
									<div className="text-[16px] text-red-500 text-center mt-[0.4rem]">
										이메일 형식을 지켜주세요.
									</div>
								)}
								<div className="mt-[1.6rem]">
									<label>비밀번호</label>
									<input
										className="w-full p-[1.2rem] mt-[0.4rem] border shadow-md h-[4.8rem] rounded-[2rem]"
										type="password"
										disabled={loginType === 'google'}
										{...register('password', {
											required: true,
											minLength: 8
										})}
									/>
									{errors.password?.type === 'minLength' && (
										<div className="text-[16px] text-red-500 mt-[0.4rem] text-center">
											비밀번호는 최소 8자 이상으로 입력해주세요.
										</div>
									)}
								</div>
							</div>
							<div className="mt-[1.6rem]">
								<label>비밀번호</label>
								<input
									className="w-full p-[1.2rem] mt-[0.4rem] border shadow-md h-[4.8rem] rounded-[2rem]"
									type="password"
									disabled={loginType === 'google'}
									{...register('password', {
										required: true,
										minLength: 8
									})}
								/>
								{errors.password?.type === 'minLength' && (
									<div className="text-[16px] text-red-500 mt-[0.4rem] text-center">
										비밀번호는 최소 8자 이상으로 입력해주세요.
									</div>
								)}
							</div>
						</>
					)}
					<div className="mt-[1.6rem]">
						<label>이름</label>
						<input
							className="w-full p-[1.2rem] mt-[0.4rem] border shadow-md h-[4.8rem] rounded-[2rem]"
							type="text"
							{...register('userName', {
								required: true
							})}
						/>
					</div>

					<div className="mt-[1.6rem]">
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
								className={`${labelProperties} h-[4.8rem] rounded-l-[2rem] w-1/2 text-center p-[1.2rem] inline-block relative border border-r-0 cursor-pointer after:left-full after:border-r-0`}
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
								className={`${labelProperties} h-[4.8rem] rounded-r-[2rem] w-1/2 text-center p-[1.2rem] inline-block relative border border-l-0 cursor-pointer after:-left-full after:border-l-0`}
								htmlFor="female">
								여성
							</label>
						</span>
					</div>

					<div className="mt-[1.6rem]">
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
								className={`${labelProperties} h-[4.8rem] rounded-l-[2rem] w-1/2 text-center p-[1.2rem] inline-block relative border border-r-0 cursor-pointer after:left-full`}
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
								className={`${labelProperties} h-[4.8rem] rounded-r-[2rem] w-1/2 text-center p-[1.2rem] inline-block relative border border-l-0 cursor-pointer after:-left-full`}
								htmlFor="user">
								회원
							</label>
						</span>
					</div>

					{areYouTrainer ? (
						<div className="flex flex-col mt-[1.6rem]">
							<div className="grid grid-cols-3 gap-[1.2rem]">
								{interestedTypes.map(type => {
									return (
										<React.Fragment key={type.id}>
											<span
												className={`py-[0.8rem] px-[2rem] border rounded-[2rem] text-[1.6rem] text-center ${
													interestedTypes[type.id].status
														? 'bg-[#FDAD00]'
														: ''
												}`}
												data-id={type.id}
												onClick={e => {
													if (
														e !== null &&
														e.target instanceof HTMLElement
													) {
														const idx = Number(e.target.dataset.id)
														if (interestedTypes[idx].status) {
															setInterestedTypes(
																interestedTypes.map(type => {
																	if (type.id === idx) {
																		type.status = false
																	}
																	return type
																})
															)
														} else {
															setInterestedTypes(
																interestedTypes.map(type => {
																	if (type.id === idx) {
																		type.status = true
																	}
																	return type
																})
															)
														}
													}
												}}>
												{type.name}
											</span>
										</React.Fragment>
									)
								})}
							</div>
						</div>
					) : (
						<>
							<div className="mt-[1.6rem]">
								<label>생년월일</label>
								<input
									className="w-full p-[1.2rem] mt-[0.4rem] border shadow-md h-[4.8rem] rounded-[2rem]"
									type="date"
									{...register('birthDate', {
										required: true
									})}
								/>
							</div>

							<div className="mt-[1.6rem]">
								<label>휴대폰 번호</label>
								<input
									className="w-full p-[1.2rem] mt-[0.4rem] border shadow-md h-[4.8rem] rounded-[2rem]"
									type="text"
									{...register('phoneNumber', {
										required: true,
										pattern: /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/
									})}
								/>
								{errors.phoneNumber && (
									<div className="text-[16px] text-red-500 mt-[0.4rem] text-center">
										붙임표(-)는 제외하고 입력해주세요.
									</div>
								)}
							</div>
						</>
					)}

					<div className="flex items-center mt-[1.6rem]">
						<input
							className="mr-[0.4rem]"
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
						className={`w-full h-[4.8rem] mt-[1.6rem] text-black bg-[#FDAD00] cursor-pointer disabled:opacity-50 rounded-[2rem]`}
						value="회원가입"
						type="submit"
						disabled={checkedPersonalInfo ? false : true}
					/>
				</form>
			</div>

			{modal ? (
				<div className="fixed bottom-0 right-0 h-full overflow-auto">
					<div
						className="fixed inset-0 -z-10 opacity-30"
						onClick={() => modalVar(false)}></div>
					<div className="flex flex-col p-[2rem] text-[1.4rem] bg-white z-10">
						<div className="text-left text-[2.4rem] font-bold">
							Bodysign 개인정보처리방침
						</div>

						<div className="mt-[1.6rem]">
							<div className="font-semibold bg-gray-100">목적</div>
							<div className="mt-[0.4rem]">
								{`<Bodysign>`} (이하 "서비스"라 합니다.)과 관련하여,
								서비스와 이용 고객 간에 서비스의 이용조건 및 절차, 서비스와
								회원 간의 권리, 의무 및 기타 필요한 사항을 규정
							</div>
						</div>

						<div className="mt-[1.6rem]">
							<div className="font-semibold bg-gray-100">
								처리 및 보유기간
							</div>
							<div className="mt-[0.4rem]">
								{`<Bodysign>`}은 법령에 따른 개인정보 보유 이용기간 또는
								정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유
								이용기간 내에서 개인정보를 처리 보유 (서비스 종료시까지)
							</div>
						</div>

						<div className="mt-[1.6rem]">
							<div className="font-semibold bg-gray-100">
								개인정보 파기절차 및 파기방법
							</div>
							<div className="mt-[0.4rem]">
								{`<Bodysign>`}은 개인정보 보유기간의 경과, 처리목적 달성 등
								개인정보가 불필요하게 되었을 때에는 지체없이 해당
								개인정보를 파기( {`<Bodysign>`}은 전자적 파일 형태롤 기록
								저장된 개인정보는 기록을 재생할 수 없도록 파기)
							</div>
						</div>

						<div className="mt-[1.6rem]">
							<div className="font-semibold bg-gray-100">
								개인정보 권리 & 의무 행사방법
							</div>
							<div className="mt-[0.4rem]">
								정보 주체는 {`<Bodysign>`}에 대해 언제든지 개인정보 열람
								정정 삭제 처리정지 요구 등의 권리 행사 가능
							</div>
						</div>

						<div className="mt-[1.6rem]">
							<div className="font-semibold bg-gray-100">
								개인정보 보호책임자
							</div>
							<div className="mt-[0.4rem]">
								<p>성명 : 김창동</p>
								<p>연락처 : 010-7204-6072</p>
							</div>
						</div>

						<div className="mt-[1.6rem]">
							<div className="font-semibold bg-gray-100">
								개인정보 처리항목
							</div>
							<div className="mt-[0.4rem]">
								이메일, 비밀번호, 이름, 생년월일, 전화번호, 근무환경
							</div>
						</div>

						<div className="mt-[1.6rem]">
							<div className="font-semibold bg-gray-100">
								안정성 확보조치
							</div>
							<div className="mt-[0.4rem]">
								개인정보 처리시스템 등의 접근권한 관리, 고유식별번호 등의
								암호화
							</div>
						</div>

						<div className="mt-[1.6rem]">
							<div className="font-semibold bg-gray-100">
								개인정보 처리방침 변경사항
							</div>
							<div className="mt-[0.4rem]">
								개인정보 처리 방침은 2021.12.21 부터 시행
							</div>
						</div>

						<div className="mt-[1.6rem]">
							<div className="font-semibold bg-gray-100">
								개인정보의 열람청구를 접수 및 처리하는 부서
							</div>
							<div className="mt-[0.4rem]">개인정보 보호책임자와 동일</div>
						</div>

						<div className="mt-[1.6rem]">
							<div className="font-semibold bg-gray-100">
								정보주체의 권익침해에 대한 구제방법
							</div>
							<div className="mt-[0.4rem]">
								<ul className="ml-[1.6rem] list-decimal">
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

						<button
							className="w-full h-[4.8rem] mt-[1.6rem] p-[1.2rem] text-black bg-[#FDAD00] cursor-pointer shadow-md rounded-[2rem]"
							type="submit"
							onClick={() => modalVar(false)}>
							확인
						</button>
					</div>
				</div>
			) : null}
		</>
	)
}

export default Signup
