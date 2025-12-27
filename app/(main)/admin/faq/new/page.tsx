import Container from '@/components/layouts/Container'
import Form from './_components/form'

const AddNewCoursePage = async() => {

  return (
    <main>
        <Container>
            <h1 className='my-5 text-3xl'>اضافة سؤال جديد</h1>
            <Form/>
        </Container>
    </main>
  )
}

export default AddNewCoursePage