import Input from "../common/Input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSubmitButton from "../common/FormSubmitButton";
import authService from "../../service/authService";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../../constants/constants";
import { Link, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import FormContainer from "../common/FormContainer";
import { useState } from "react";

const signinSchema = z.object({
  username: z
    .string()
    .nonempty("이메일을 입력해주세요")
    .email("유효한 이메일 형식이어야 합니다"),
  password: z
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
    .regex(/[A-Za-z]/, "영문자를 최소 1개 포함해야 합니다")
    .regex(/\d/, "숫자를 최소 1개 포함해야 합니다")
    .regex(/[!%*#?&]/, "특수문자(!%*#?&)를 최소 1개 포함해야 합니다"),
});

type SigninFormState = z.infer<typeof signinSchema>;
export default function SigninForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormState>({
    resolver: zodResolver(signinSchema),
  });
  const user = useAuth();
  const { mutate: signin, isPending } = useSignin();
  const [visible, setVisible] = useState(false);

  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <FormContainer
      onSubmit={handleSubmit((data) => {
        signin(data);
      })}
    >
      <Input
        defaultValue={"code123@gmail.com"}
        label="이메일"
        {...register("username")}
        type="email"
        error={errors.username}
        id="email"
      />
      <div className="relative w-full">
        <Input
          defaultValue={"q123123123!@#"}
          label="비밀번호"
          {...register("password")}
          type={visible ? "text" : "password"}
          error={errors.password}
          id="password"
        />
        <button
          className="size-6 absolute top-0 right-3 bottom-0 my-auto translate-y-1/2 cursor-pointer"
          onClick={() => setVisible((prev) => !prev)}
          type="button"
        >
          {visible ? <EyeOff /> : <Eye />}
        </button>
      </div>
      <FormSubmitButton disabled={isPending}>
        {isPending ? "로그인 중..." : "로그인"}
      </FormSubmitButton>
      <Link
        className="relative -top-7 text-gray-400 text-sm md:text-base"
        to={"/signup"}
      >
        회원가입
      </Link>
    </FormContainer>
  );
}

const useSignin = () => {
  return useMutation({
    mutationFn: async (payload: SigninFormState) =>
      await authService.signin(payload),
    onSuccess: ({ accessToken, refreshToken }) => {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

      location.href = "/";
    },
    onError: () => alert("다시 확인"),
  });
};

const Eye = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  );
};

const EyeOff = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  );
};
