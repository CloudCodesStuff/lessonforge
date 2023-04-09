import Nav from "@/components/nav";
import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <div className='w-screen h-screen bg-primary-700 p-14'>

    <div className="w-fit mx-auto drop-shadow-xl">

      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" redirectUrl="/app" appearance={{
        layout: {
        
          socialButtonsPlacement: 'bottom'
        },
        elements:{
          'card': 'font-plus',
          'required':'rounded-md'
        }
      }} />

    </div>
    </div>

);

export default SignInPage;