import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '標題',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: '描述',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'thumbnail',
      title: '縮圖',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'thumbnailUrl',
      title: '縮圖網址 (Cloudinary)',
      type: 'url',
      description: '如果使用 Cloudinary，請輸入圖片網址',
    }),
    defineField({
      name: 'date',
      title: '日期',
      type: 'string',
    }),
    defineField({
      name: 'readTime',
      title: '閱讀時間',
      type: 'string',
    }),
    defineField({
      name: 'rating',
      title: '評分',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: 'subtitle',
      title: '副標題',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: '內容',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: '替代文字',
            },
            {
              name: 'imageUrl',
              type: 'url',
              title: '圖片網址 (Cloudinary)',
            },
          ],
        },
        {
          type: 'object',
          name: 'videoEmbed',
          title: '影片',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: '影片網址',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'sections',
      title: '內容區塊 (舊格式)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'section',
          fields: [
            {
              name: 'type',
              title: '類型',
              type: 'string',
              options: {
                list: [
                  {title: '標題', value: 'heading'},
                  {title: '段落', value: 'paragraph'},
                  {title: '圖片', value: 'image'},
                  {title: '影片', value: 'video'},
                ],
              },
            },
            {
              name: 'content',
              title: '文字內容',
              type: 'text',
            },
            {
              name: 'src',
              title: '圖片/影片網址',
              type: 'url',
            },
            {
              name: 'alt',
              title: '替代文字',
              type: 'string',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      media: 'thumbnail',
    },
  },
})
