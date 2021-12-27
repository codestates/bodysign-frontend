import { useRouter } from 'next/dist/client/router'
import BotNavChatLink from '../molecules/Link/BotNavChatLink'
import BotNavExerciseLink from '../molecules/Link/BotNavExerciseLink'
import BotNavHomeLink from '../molecules/Link/BotNavHomeLink'
import BotNavMemberLink from '../molecules/Link/BotNavMemberLink'
import BotNavMenuLink from '../molecules/Link/BotNavMenuLink'
import BotNavSessionLink from '../molecules/Link/BotNavSessionLink'

interface ComponentProps {
	variant?: string
	children?: React.ReactNode
}

const BottomBar = ({ variant = 'Trainer' }: ComponentProps) => {
	const router = useRouter()
	const pathName = router.pathname

	return (
		<div className="sticky bottom-0 flex justify-between px-8 py-2 text-gray-400 border-t bg-gray-50 sm:w-[450px] m-auto">
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
