import React from 'react'
import { toast } from 'react-toastify'
import { useMutation } from '@apollo/react-hooks'

import LoginModalToggler from 'containers/Navbar/LoginModalToggler'
import ChapterSummaryFormIndex from 'containers/Forms/ChapterSummaryForm'

import { useAuth } from 'providers/Auth'

import { CREATE_CHAPTER_SUMMARY, ALL_CHAPTER_SUMMARIES } from './queries'

export default ({ bookId, chapter }) => {
	const { jwt, userId } = useAuth()
	const [createChapterSummary] = useMutation(CREATE_CHAPTER_SUMMARY)

	return (
		<>
			{!!jwt ? (
				<ChapterSummaryFormIndex
					onSubmit={data => {
						return addSummary(createChapterSummary, userId, bookId, chapter, data)
					}}
				/>
			) : (
				<NotLoggedIn />
			)}
		</>
	)
}

const addSummary = (createChapterSummary, userId, bookId, chapter, data) => {
	const { summary } = data

	return createChapterSummary({
		variables: {
			userId,
			summary,
			bookId,
			chapter,
		},
		update: (proxy, res) => {
			const chapterSummary = res.data.createChapterSummary.chapterSummary

			let updatedData = proxy.readQuery({ query: ALL_CHAPTER_SUMMARIES, variables: { bookId, chapter } })

			updatedData = {
				...updatedData,
				allChapterSummaries: {
					...updatedData.allChapterSummaries,
					nodes: [
						// Avoid duplication
						chapterSummary,
						...updatedData.allChapterSummaries.nodes.filter(val => val.nodeId !== chapterSummary.nodeId),
					],
				},
			}

			proxy.writeQuery({
				query: ALL_CHAPTER_SUMMARIES,
				variables: { bookId, chapter },
				data: updatedData,
			})
		},
	})
		.then(() => {
			toast.success(
				<p>
					<i className="far fa-check-circle" /> Successfully posted!
				</p>,
			)
		})
		.catch(err => {
			console.error(err)
			toast.error('Error creating the post. Please try again later.')
			throw new Error()
		})
}

const NotLoggedIn = () => {
	return (
		<div>
			<LoginModalToggler>
				<span className="link">Register or Login now to post!</span>
			</LoginModalToggler>
		</div>
	)
}
