import * as S from './LoginStyles'

interface IPropsLoginUI{
    register:any
    handleSubmit:any 
    formState: any
    onClickLogin : (data:any) => void
}

export default function LoginUI(props:IPropsLoginUI){

    return(
        <S.Form onSubmit={props.handleSubmit(props.onClickLogin)}>
            <S.Login>
                <S.Logo src='/images/로고.png'></S.Logo>
                <S.Contents>
                    <S.Email>E-mail</S.Email>
                    <S.EmailDetail {...props.register("email")} type='text' placeholder='이메일을 입력하세요.'/>
                    <S.ErrorMsg>{props.formState.errors.email?.message}</S.ErrorMsg>
                    <S.Password>Password</S.Password>
                    <S.PasswordDetail {...props.register("password")} type='password'placeholder='비밀번호를 입력하세요.'/>
                    <S.ErrorMsg>{props.formState.errors.password?.message}</S.ErrorMsg>
                </S.Contents>
                <S.LoginButton>Login</S.LoginButton>
                <S.Social>
                    <S.SocialTitle>소셜 아이디로 간편 로그인</S.SocialTitle>
                    <S.SocialContents>
                        <S.Kakao src='/images/btn-kakao.png'/>
                        <S.Naver src='/images/btn-naver.png'/>
                        <S.FaceBook src='/images/btn-facebook.png'/>
                    </S.SocialContents>
                </S.Social>
                <S.Question> 계정이 없으신가요? 회원가입하기</S.Question>
            </S.Login>
            <S.IconBox>
                <S.Left src='/images/Frame.png'></S.Left>
                <S.Right src='/images/Frame (1).png'></S.Right>
            </S.IconBox>
        </S.Form>
    )
    
}