import { NextPage } from 'next'
import { useState } from 'react'
import Layout from '../components/Layout'

const Signup: NextPage = () => {
	const [gender, setGender] = useState('male')
	const [memberOrTrainer, setMemberOrTrainer] = useState('member')
	const [validatePassword, setValidatePassword] = useState('')
	const [form, setForm] = useState({
		email: '',
		password: '',
		name: '',
		birth: '',
		phone: '',
		gender: '',
		memberOrTrainer: ''
	})
	const [error, setError] = useState('')

	const isInvalid = form.email === '' || form.password === ''

	const SingUp = () => {
		// e.preventDefault()
		// 회원가입 api
		console.log(form)

		// 성공

		// 실패 setError
	}

	return (
		<>
			<Layout variant="Web">
				<div className="flex flex-col w-full mx-4 my-5 text-[12px]">
					<div className="text-[20px] mb-3 text-center">회원가입</div>

					<div className="mb-3">
						<label>이메일</label>
						<input
							className="w-full h-12 p-1 mt-1 border"
							type="email"
							onChange={e => setForm({ ...form, email: e.target.value })}
						/>
					</div>

					<div className="mb-3">
						<label>비밀번호</label>
						<input
							className="w-full h-12 p-1 mt-1 border"
							type="password"
							onChange={e =>
								setForm({ ...form, password: e.target.value })
							}
						/>
					</div>

					<div className="mb-3">
						<label>비밀번호 재입력</label>
						<input
							className="w-full h-12 p-1 mt-1 border"
							type="password"
							onChange={e => setValidatePassword(e.target.value)}
						/>
					</div>

					{form.password !== validatePassword ? (
						<div className="mb-3 font-normal text-red-500">
							비밀번호가 일치하지 않습니다.
						</div>
					) : null}

					<div className="mb-3">
						<label>이름</label>
						<input
							className="w-full h-12 p-1 mt-1 border"
							type="text"
							onChange={e => setForm({ ...form, name: e.target.value })}
						/>
					</div>

					<div className="mb-3">
						<label>생년월일</label>
						<input
							className="w-full h-12 p-1 mt-1 border"
							type="date"
							onChange={e => setForm({ ...form, birth: e.target.value })}
						/>
					</div>

					<div className="mb-3">
						<label>휴대폰 번호</label>
						<input
							className="w-full h-12 p-1 mt-1 border"
							type="text"
							onChange={e => setForm({ ...form, phone: e.target.value })}
						/>
					</div>

					<div className="mb-3">
						{/* <label>성별</label> */}
						<div className="flex items-center w-full h-12 mt-1 border">
							<div
								className={`w-1/2 h-full flex items-center justify-center ${
									gender === 'male' ? 'bg-gray-100' : ''
								}`}
								onClick={() => {
									setGender('male')
									setForm({ ...form, gender: 'male' })
								}}>
								남자
							</div>
							<div
								className={`w-1/2 h-full flex items-center justify-center ${
									gender === 'female' ? 'bg-gray-100' : ''
								}`}
								onClick={() => {
									setGender('female')
									setForm({ ...form, gender: 'female' })
								}}>
								여자
							</div>
						</div>
					</div>

					{/* https://brunch.co.kr/@monodream/80 */}
					<div className="mb-3">
						{/* <label>성별</label> */}
						<div className="flex items-center w-full h-12 mt-1 border">
							<div
								className={`w-1/2 h-full flex items-center justify-center ${
									memberOrTrainer === 'member' ? 'bg-gray-100' : ''
								}`}
								onClick={() => {
									setMemberOrTrainer('member')
									setForm({ ...form, memberOrTrainer: 'member' })
								}}>
								회원
							</div>
							<div
								className={`w-1/2 h-full flex items-center justify-center ${
									memberOrTrainer === 'trainer' ? 'bg-gray-100' : ''
								}`}
								onClick={() => {
									setMemberOrTrainer('trainer')
									setForm({ ...form, memberOrTrainer: 'trainer' })
								}}>
								트레이너
							</div>
						</div>
					</div>

					<div>
						<button
							className="w-full h-12 text-black bg-yellow-200 disabled:opacity-50"
							disabled={isInvalid}
							onClick={() => SingUp()}>
							가입 완료
						</button>
					</div>
				</div>
			</Layout>
		</>
	)
}

export default Signup
