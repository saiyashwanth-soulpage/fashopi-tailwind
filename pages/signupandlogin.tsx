import Image from "next/image";
// import Pinkfade from "../public/pinkfade.png";
import Layer from "../public/Layer0.png";
import Leftimage from "../public/Rectangleleftsignup.png";
import Fashpilogo from "../public/fashpilogo.png";
// for form validations
import { useForm } from "react-hook-form";
// for login & signup routes
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthenticationService from "services/authentication.service";
import cookie from "js-cookie";
import { toast } from "react-toastify";

export default function Signupandlogin() {
  const authService = new AuthenticationService();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm();

  // for login & signup routes
  const [forlogin, setForlogin] = useState(true);

  // boderbottom
  const [borderlogin, setBorderlogin] = useState("login");

  const loginroute = () => {
    setForlogin(true);
    setBorderlogin("login");
  };

  const signuproute = () => {
    setForlogin(false);
    setBorderlogin("signup");
  };

  useEffect(() => {
    if (router.query.forlogin !== undefined) loginroute();
  }, []);

  // for validations in email and password (pattern) in login page
  const mobilenumberpattern = /^([+]\d{2})?\d{10}$/;
  const emailpattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const passwordpattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;

  // for login form submission
  const onSubmit1 = (data: any) => {
    console.log(data);
    const xyz: any = {
      firstname: data.firstname,
      lastname: data.lastname,
      mobilenumber: data.mobilenumber,
      email: data.email,
      password: data.password,
    };

    authService
      .login(xyz)
      .then((res: any) => {
        console.log(res);
        console.log(res.authToken_is_anyname);
        cookie.set("accessToken", res.authToken_is_anyname);
        toast.success("Login successfull ", { autoClose: 2000 });
        // authService.authenticateUser(res?.token);
        router.push("/dashboard");
      })
      .catch((err: any) => {
        toast.error(err.message);
      });

    // or like this - axios .post("api/login", xyz) .then((res: any) => {
  };

  // for signup form submission
  const onSubmit2 = (data: any) => {
    console.log(data);
    const xyz: any = {
      firstname: data.firstname,
      lastname: data.lastname,
      mobilenumber: data.mobilenumber,
      email: data.email,
      password: data.password,
    };

    authService
      .signup(xyz)
      .then((res: any) => {
        console.log(res);
        // alert("Account created successfully. Please login !");
        toast.success("Account created successfully. Please login !");
        router.push("/signupandlogin?forlogin");
      })
      .catch((err: any) => {
        toast.error(err.message);
      });

    //or like this - axios .post("api/signup",xyz) .then((res: any) => {
  };

  // this is error object in console. see it for better understanding
  console.log("errors object is", errors);

  return (
    <div className=" bg-gray-800 w-full h-screen object-cover flex justify-center items-center">
      {/* for center  */}
      <div className="w-214 h-48 m-5 flex md:w-2/4 md:h-4/6 lg:w-2/4 lg:h-4/6 xl:w-2/4 xl:h-4/6 2xl:w-2/4 2xl:h-4/6">
        {/* center 1st half */}
        <Image className="w-1/2" src={Leftimage} alt="image" />

        {/* center 2nd half */}
        <div className="w-1/2 bg-white flex flex-col gap-2 align-center justify-center px-2">
          {/* login and signup text */}
          <div className="flex justify-center items-center gap-2 my-2 text-xs sm:text-sm sm:mb-6 md:text-base md:mb-7 lg:text-lg lg:mb-8 xl:text-xl 2xl:text-2xl ">
            <p
              className=""
              onClick={loginroute}
              style={{
                borderBottom:
                  borderlogin === "login" ? "2px solid #dd0c55" : "none",
              }}
            >
              Login
            </p>
            <p
              className=""
              onClick={signuproute}
              style={{
                borderBottom:
                  borderlogin === "signup" ? "2px solid #dd0c55" : "none",
              }}
            >
              Signup
            </p>
          </div>

          {/* login form */}
          <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
            {forlogin && (
              <form
                className="flex flex-col justify-center gap-2 "
                onSubmit={handleSubmit(onSubmit1)}
              >
                <input
                  type="email"
                  placeholder="Email Id"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: emailpattern,
                      message: "this is not a valid email",
                    },
                  })}
                />
                {errors.email?.message}
          

                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message:
                        "please enter correct password & it should be more than 8 characters",
                    },
                    pattern: {
                      value: passwordpattern,
                      message:
                        "Password criteria - 1 uppercase,1 lowercase,1 number,1 special character, minimum 8 characters",
                    },
                  })}
                />
                {errors.password?.message}

                <button className="edge rounded-sm border-3 mx-2">Login</button>
              </form>
            )}
          </div>

          {/* for signup form */}
          <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
            {!forlogin && (
              <form
                className="flex flex-col justify-center"
                onSubmit={handleSubmit(onSubmit2)}
              >
                <input
                  type="text"
                  placeholder="First Name"
                  {...register("firstname", {
                    required: { value: true, message: "firstname is required" },
                  })}
                />
                {errors.firstname?.message}

                <input
                  type="text"
                  placeholder="Last Name"
                  {...register("lastname", {
                    required: { value: true, message: "lastname is required" },
                  })}
                />
                {errors.lastname?.message}

                <input
                  type="tel"
                  placeholder="Mobile number"
                  {...register("mobilenumber", {
                    required: {
                      value: true,
                      message: "mobile number is required",
                    },
                    pattern: {
                      value: mobilenumberpattern,
                      message: "please enter valid number",
                    },
                  })}
                />
                {errors.mobilenumber?.message}

                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: emailpattern,
                      message: "this is not a valid email",
                    },
                  })}
                />
                {errors.email?.message}

                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message:
                        "please enter correct password & it should be more than 8 characters",
                    },
                    pattern: {
                      value: passwordpattern,
                      message:
                        "Password is not matching the criteria.Password must contain one uppercase, one lowercase, one number, one special character, minimus 8 characters",
                    },
                  })}
                />
                {errors.password?.message}

                <button className="edge rounded-sm border-3 mx-2">
                  Signup
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-col items-center justify-center gap-1">
            <p className="youagree flex justify-center items-center font-roboto sm:text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-xs">
              You agree with our terms by loggingin.
            </p>
            <Image src={Fashpilogo} alt="fashopi" className="w-1/3 " />
          </div>
        </div>
      </div>
    </div>
  );
}
