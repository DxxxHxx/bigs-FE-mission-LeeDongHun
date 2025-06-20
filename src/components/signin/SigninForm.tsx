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
        label="이메일"
        {...register("username")}
        type="email"
        error={errors.username}
        id="email"
      />
      <Input
        label="비밀번호"
        {...register("password")}
        type="password"
        error={errors.password}
        id="password"
      />
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

      location.pathname = "/";
    },
    onError: () => alert("다시 확인"),
  });
};
