import { FormContainer, InputContainer2, EmailDiv, ErrP, RadioContainer} from './SignupStyle';
import { useForm } from '../../../utils/useForm'

import { useSpring } from '@react-spring/core';

const SignForm = ({ isValid, email }) => {
  const{ 
    values, errors,
    handleInputChange, handleKeyPress, 
    handleRadioChange , handleSubmit} = useForm()

  const slidUp = useSpring({
    transform: isValid[0] && isValid[1]? 'translateY(0%)' : 'translateY(100%)',
    opacity : isValid[0] && isValid[1] ? 1 : 0 
  });
  
  return(
    <>
    { (isValid[0] && isValid[1]) && <EmailDiv className='emailDiv' style={slidUp}>{email}</EmailDiv> }
    <form id='signForm' onSubmit={handleSubmit}>
      <FormContainer style={slidUp}>
        <InputContainer2 >
          <input 
            id="surName"
            type="text"
            name='userName'
            placeholder="닉네임"
            onKeyUp= { handleKeyPress }
            onChange={ handleInputChange }
            value={values.userName}
            />
        </InputContainer2>
         { errors.userName  && <ErrP >{errors.userName}</ErrP>}
         <InputContainer2 >
          <input 
            id="password"
            type="password"
            name='password'
            placeholder="비밀번호"
            onKeyUp= { handleKeyPress }
            onChange={ handleInputChange }
            value={values.password}
            />
        </InputContainer2>
        <InputContainer2 >
          <input 
            id="password2"
            type="password"
            name='password2'
            placeholder="비밀번호 확인"
            onKeyUp= { handleKeyPress }
            onChange={ handleInputChange }
            value={values.password2}
            />
        </InputContainer2>
        { errors.password && <ErrP >{errors.password}</ErrP>} 
        <RadioContainer>
            <label>
              <input type="radio" value= 'male' checked={values.gender === 'male'}
                    onChange={handleRadioChange} />
              <span>Male</span>
            </label>
            <label>
              <input type="radio" value='female' checked={values.gender === 'female'}
                    onChange={handleRadioChange} 
                    />
              <span>Female</span>
            </label>
          </RadioContainer>
          <button type="submit">Submit</button>
        </FormContainer>
      </form>
    </>
  )
}

export default SignForm