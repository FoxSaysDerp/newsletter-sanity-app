import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Block Content with Title',
  name: 'blockContentWithTitle',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'overview',
      title: 'Content',
      type: 'blockContent',
    }),
  ],
})
