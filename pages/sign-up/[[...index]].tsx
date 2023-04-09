import { SignUp } from "@clerk/nextjs";
import Nav from "@/components/nav";


const SignUpPage = () => (
  <div className='w-screen h-screen bg-primary-700 p-14'>
    <div className="w-fit mx-auto drop-shadow-xl ">

      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in"
        redirectUrl="/app"

        appearance={{
          layout: {
        
            socialButtonsPlacement: 'bottom'
          }
        }} />
    </div>
  </div>
);

export default SignUpPage;