import {defineField, defineType} from 'sanity'
import {FaReact as icon} from 'react-icons/fa'

export default defineType({
  name: 'ecosystemPost',
  title: 'Ecosystem',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'postDate',
      title: 'Post Date',
      type: 'date',
    }),
    defineField({
      name: 'ecosystemNews',
      title: 'Ecosystem News',
      type: 'array',
      of: [{type: 'blockContentWithTitle'}],
    }),
  ],
  preview: {
    select: {
      date: 'postDate',
      ecosystemNews0: 'ecosystemNews.0.title',
      ecosystemNews1: 'ecosystemNews.1.title',
    },
    prepare(selection) {
      const newsTitles = [selection.ecosystemNews0, selection.ecosystemNews1]
        .filter(Boolean)
        .join(', ')

      return {
        title: selection.date,
        date: selection.date,
        subtitle: newsTitles,
      }
    },
  },
})
