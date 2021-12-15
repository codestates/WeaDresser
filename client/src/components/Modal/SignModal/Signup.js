import  SignForm  from './SignForm'
import title from './title.svg'
import { useSpring } from 'react-spring'
import { useDispatch } from 'react-redux';
import { useForm }  from'../../../utils/useForm';
import { isShowLoginModalHandler, isShowSignUpModalHandler,} from '../../../redux/actions/actions'
import { LogoContainer,InputContainer,InputButton, BackButton, ErrPtag, BackContainer,} from './SignupStyle';
import { CloseModalButton } from './ModalStyle';
import { useEffect } from 'react';
import { LoginContainer } from './LoginStyle';

function Signup({ closeModalByBtn, displaySignup }){
  // const { isShowLoginModal, isShowSignUpModal } = useSelector(state => state.isShowModalReducer)
  const dispatch = useDispatch(); 
  const { 
    handleInputChange, handleKeyPress, 
    emailValidation, codeValidation,
    values, errors, isValid, codeMsg, toLogin } = useForm();

  // email slide off 
  const displayOff = useSpring({
    transform: !isValid[0] ? 'translateY(0%)' : 'translateY(100%)',
    opacity : !isValid[0] ? 1 : 0 
  });
  // code slide on
  const displayOn = useSpring({
    transform: isValid[0] ? 'translateY(0%)' : 'translateY(100%)',
    opacity : isValid[0] ? 1 : 0 
  });

  // back to login modal handler 
  const backModalHandler = () => {
    dispatch(isShowLoginModalHandler(true));
    dispatch(isShowSignUpModalHandler(false));
  }
  // * clos only by closModalByBtn
  useEffect(() => {
    dispatch(isShowSignUpModalHandler(true))
  }, [dispatch])

  return (
  <LoginContainer style={displaySignup}>
  {/* <SignupBackModal></SignupBackModal> */}
    { !isValid[0] && !isValid[1] ? <BackButton onClick={backModalHandler}/> : null}
    <CloseModalButton onClick={closeModalByBtn}/>
    { isValid[0] && isValid[1] ? null : 
      <LogoContainer><img alt="WEADRESSER" src={title}/></LogoContainer>
    }
      { isValid[0]  ? null : 
      <>
        <InputContainer 
          style={displayOff} 
          height = {"5em"} width = {'35em'}>
          <input 
            className="signup-input"
            type="email"
            name='email'
            placeholder="Email"
            onKeyUp= { handleKeyPress }
            onChange={ handleInputChange }
            value={values.email}
            />
        </InputContainer>
        <InputButton onClick={emailValidation}>이메일 인증</InputButton>
      </>
      }
      { !isValid[0]|| (isValid[0]&& isValid[1]) ? null : 
      <>
        <InputContainer style={displayOn} width = {'35em'}>
          <input 
            className="signup-input"
            type="text"
            name='code'
            placeholder="Code"
            onKeyUp= { handleKeyPress }
            onChange={ handleInputChange }
            value={values.code}
            />
        </InputContainer>
          <InputButton onClick={codeValidation}>코드 인증</InputButton>
      </>
      }
      { errors.on && <ErrPtag>{errors.msg}</ErrPtag>}
      { codeMsg.on && 
        <ErrPtag 
          height = {'0.5em'} 
          width = {'25em'} 
          size = {'1.5em'}>
          { codeMsg.msg }
        </ErrPtag>
        }
      { toLogin.on && 
      <>
        <BackContainer>
          <p>로그인 하시겠습니까?</p>
          <BackButton className="toLoginBtn" onClick={backModalHandler}/>
        </BackContainer>
      </> 
      }
      { (isValid[0] && isValid[1]) && <SignForm isValid={isValid}  email = {values.email} /> }
  </LoginContainer>
  );
}

export default Signup;
