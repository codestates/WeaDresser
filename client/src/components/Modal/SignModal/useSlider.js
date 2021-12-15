import { useSpring } from 'react-spring'
import { useSelector } from 'react-redux';

export const ModalSlider = () => {
  const { isShowLoginModal, isShowSignUpModal } = useSelector(state => state.isShowModalReducer)
    // Translate animation (BackDrop) Y-axis
  const displayModal = useSpring({
    transform: isShowLoginModal ? 'translateY(0%)' : 'translateY(100%)',
    opacity : isShowLoginModal ? 1 : 0 
  });

  // Translate animation (Signin) Y-axis
  const displayLogin = useSpring({
    transform: isShowLoginModal ? 'translateY(0%)' : 'translateY(100%)',
    opacity : isShowLoginModal ? 1 : 0 
  });
  
  // Translate animation (Signup) X-axis
  const displaySignup = useSpring({
    transform: isShowSignUpModal ? 'translateX(0%)' : 'translateX(100%)', 
    opacity : isShowSignUpModal ? 1 : 0 
  })


  return { 
    displayModal, displayLogin, displaySignup
   }
}