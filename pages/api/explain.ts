// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { configuration } from '../../utils/constants'
import { OpenAIApi } from 'openai'

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
  const lessonPlan: LessonPlan = req.body
  console.log('lessonPlan', lessonPlan)

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: 
    
    `Create a detailed lesson plan about ${lessonPlan.topic} with the following format. The grade level should be ${lessonPlan.level} and the description is ${lessonPlan.description}. The class is ${lessonPlan.length} minutes long. You may add items as nessecary to each catagory. Make sure you bold the catagories using <strong></strong> and finish filling out every sentence! MAKE SURE YOU RESPOND IN BULLETS, NOT SENTENCES. Make sure the lesson does not go over the class lenght. 

Topic:Topic
    You sould return links 
    Learning objectives:
    Students will be able to....
    
    Materials:
    Pencil
    Paper
    Blah
    etc
    
    Intro (duration):

    -rtbrtb
    -rtbrtb
    -rbrtb
    -trtb
    
    Procedure (duration):
    -rtbrtb
    -rtbrtb
    -rbrtb
    -trtb
    
    Assesment (duration):
    -rtbrtb
    -rtbrtb
    -rbrtb
    -trtb
    
    Conclusion (duration):
    -rtbrtb
    -rtbrtb
    -rbrtb
    -trtb
    `,
    temperature: 0.85,
    max_tokens: 700,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })

  const suggestion = response.data?.choices?.[0].text

  if (suggestion === undefined) throw new Error('No suggestion found')
  res.setHeader('Content-Type', 'text/html')

  res.status(200).json({ result: suggestion })
}
