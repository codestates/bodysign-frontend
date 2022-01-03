import { useRouter } from 'next/dist/client/router'
import BotNavChatLink from '../molecules/Link/BotNavChatLink'
import BotNavExerciseLink from '../molecules/Link/BotNavExerciseLink'
import BotNavHomeLink from '../molecules/Link/BotNavHomeLink'
import BotNavMemberLink from '../molecules/Link/BotNavMemberLink'
import BotNavMenuLink from '../molecules/Link/BotNavMenuLink'
import BotNavSessionLink from '../molecules/Link/BotNavSessionLink'

interface ComponentProps {
	children?: React.ReactNode
}

const BottomBar = ({}: ComponentProps) => {
	const router = useRouter()
	const pathName = router.pathname
	let variant = 'Trainer'
	if (pathName.includes('user')) {
		variant = 'Member'
	}

	return (
		<div className="fixed bottom-0 right-0 flex w-full justify-between px-[3.2rem] py-[0.8rem] text-gray-400 bg-gray-50">
			{variant === 'Trainer' ? (
				<>
					<BotNavHomeLink variant={variant} pathName={pathName} />
					<BotNavMemberLink pathName={pathName} />
					<BotNavExerciseLink pathName={pathName} />
					<BotNavSessionLink variant={variant} pathName={pathName} />
					<BotNavMenuLink variant={variant} pathName={pathName} />
				</>
			) : (
				<>
					<BotNavHomeLink variant={variant} pathName={pathName} />
					<BotNavSessionLink variant={variant} pathName={pathName} />
					<BotNavChatLink variant={variant} pathName={pathName} />
					<BotNavMenuLink variant={variant} pathName={pathName} />
				</>
			)}
		</div>
	)
}

export default BottomBar
