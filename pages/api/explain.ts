// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { configuration } from '../../utils/constants'
import { OpenAIApi } from 'openai'
import { toast } from 'react-toastify'

type Data = {
  result: string
}

type LessonPlan = {
  topic: string
  level: string
  description: string
  length: number
}

const openai = new OpenAIApi(configuration)

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const lessonPlan: LessonPlan = req.body
    console.log('lessonPlan', lessonPlan)

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content":   `Create a detailed lesson plan about ${lessonPlan.topic} with the following format. 
      The grade level should be ${lessonPlan.level} and the description is ${lessonPlan.description}. 
      The class is ${lessonPlan.length} minutes long. You may add items as necessary to each category. 
      Make sure you bold the categories using <strong></strong> and finish filling out every sentence! 
      MAKE SURE YOU RESPOND IN BULLETS, NOT SENTENCES. Make sure the lesson does not go over the class length.
      Explain carefully and be detailed about every step. Be sure to add more steps. 

      Topic: ${lessonPlan.topic}

      Learning objectives:
      - 

      Materials:
      - Pencil
      - Paper
      - Blah

      Intro (duration):
      - 
      - 
      - 
      - 

      Procedure (duration):
      - 
      - 
      - 
      - 

      Assessment (duration):
      - 
      - 
      - 
      - 

      Conclusion (duration):
      - 
      - 
      - 
      - 
    `}],
    

      temperature: 0.85,
      max_tokens: 700,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })

    const suggestion = response.data.choices[0].message?.content
    console.log(suggestion)

    if (suggestion === undefined) throw new Error('No suggestion found')
    res.setHeader('Content-Type', 'text/html')

    res.status(200).json({ result: suggestion })
  } catch (error) {
    console.error(error)
    if (error) throw new Error('Something happened on our end. Error:'+error)
  }
}
