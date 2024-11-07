// "use client"

// import { FormGenerator } from "@/components/global/form-generator"
// import { Loader } from "@/components/global/loader"
// import { Button } from "@/components/ui/button"
// import { GROUPLE_CONSTANTS } from "@/constants"
// import { useAuthSignIn } from "@/hooks/authentication"

// type Props = {}

// const SignInForm = (props: Props) => {
//   const { isPending, onAuthenticateUser, register, errors } = useAuthSignIn()

//   return (
//     <form className="flex flex-col gap-3 mt-10" onSubmit={onAuthenticateUser}>
//       {GROUPLE_CONSTANTS.signInForm.map((field) => (
//         <FormGenerator
//           {...field}
//           key={field.id}
//           register={register}
//           errors={errors}
//         />
//       ))}
//       <Button type="submit" className="rounded-2xl">
//         <Loader loading={isPending}>Sign In with Email</Loader>
//       </Button>
//     </form>
//   )
// }

// export default SignInForm









"use client"

import { FormGenerator } from "@/components/global/form-generator"
import { Loader } from "@/components/global/loader"
import { Button } from "@/components/ui/button"
import { GROUPLE_CONSTANTS } from "@/constants"
import { useAuthSignIn } from "@/hooks/authentication"
import Link from "next/link"

type Props = {}

const SignInForm = (props: Props) => {
    const { isPending, onAuthenticateUser, register, errors } = useAuthSignIn()

    return (
        <form
            className="flex flex-col gap-3 mt-10"
            onSubmit={onAuthenticateUser}
        >
            {GROUPLE_CONSTANTS.signInForm.map((field) => (
                <FormGenerator
                    {...field}
                    key={field.id}
                    register={register}
                    errors={errors}
                />
            ))}
            <Button type="submit" className="rounded-2xl">
                <Loader loading={isPending}>Sign In with Email</Loader>
            </Button>
            <div className=" text-themeTextGray ">
                {" "}
                Did'nt have an account{" "}
            </div>
            <Link href="/sign-up">
                <Button type="submit" className="rounded-2xl">
                    <Loader loading={isPending}>Create an account </Loader>
                </Button>
            </Link>
        </form>
    )
}

export default SignInForm

