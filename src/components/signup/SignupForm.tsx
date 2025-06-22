import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import Input from "../common/Input";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import FormSubmitButton from "../common/FormSubmitButton";
import FormContainer from "../common/FormContainer";
import authService from "../../service/authService";

const signUpSchema = z
  .object({
    name: z.string().nonempty("사용자명을 입력해주세요"),
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
    confirmPassword: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
      .regex(/[A-Za-z]/, "영문자를 최소 1개 포함해야 합니다")
      .regex(/\d/, "숫자를 최소 1개 포함해야 합니다")
      .regex(/[!%*#?&]/, "특수문자(!%*#?&)를 최소 1개 포함해야 합니다"),
  })
  .refine((form) => form.password === form.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export type SignupFormState = z.infer<typeof signUpSchema>;
export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormState>({
    resolver: zodResolver(signUpSchema),
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignupFormState> = async (
    data: SignupFormState
  ) => {
    try {
      await authService.signup(data);

      alert("회원 가입이 완료되었습니다.");
      navigate("/");
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e);
        alert(e.response?.data?.message);
      }
    }
  };
  return (
    <FormContainer
      onKeyDown={(e) => {
        if (e.key !== "Enter") return;
        e.preventDefault();
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-3xl">회원 가입</h1>
      <Input
        id="username"
        label="이메일"
        error={errors.username}
        {...register("username")}
        type="email"
      />
      <Input
        id="name"
        label="사용자 이름"
        error={errors.name}
        {...register("name")}
        type="text"
      />
      <Input
        id="password"
        label="비밀번호"
        error={errors.password}
        {...register("password")}
        type="password"
      />
      <Input
        id="confirmPassword"
        label="비밀번호 확인"
        error={errors.confirmPassword}
        {...register("confirmPassword")}
        type="password"
      />
      <FormSubmitButton>회원가입</FormSubmitButton>
    </FormContainer>
  );
}
