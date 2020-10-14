import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../assets/images/logowbg.png';
import { ReactComponent as Google } from '../assets/icons/google.svg';
import { ReactComponent as Facebook } from '../assets/icons/facebook.svg';


import { connect } from 'react-redux';
// Importam actiunea loginUser, care se va ocupa le loginul userului(request asincron)
import { loginUserWithFacebook, loginUserWithGoogle } from '../redux/actions/userActions';

class Login extends React.Component {
    // Foarte important! Am facut login o class component pentru a putea avea acces la componentDidUpdate.
    // De ce? Daca s-au schimbat datele despre user, fiind in pagina de login, asta inseamna ca un user nou
    // s-a logat cu succes. Ce e de facut in acest caz? Trebuie sa redirectam catre Home!
    componentDidUpdate(prevProps) {
        if (this.props.user !== prevProps.user) {
            this.props.history.push('/');
        }
    }
 
    render() {
        return(
            <div className="d-flex flex-column align-items-center">
                {/* Logo-ul va duce catre Home. */}
                <Link to='/'>
                    <img className='pt-5'  src={Logo} alt="logo" />
                </Link>
    
                <h1>Log in</h1>
                <p>Please choose a login provider:</p>
    
                {/* Butonul de login cu Google, la pachet cu  */}
                <button
                    style={{height:60}}
                    // Clasele sunt de Bootstrap, din nou, daca nu le stiti, cautati-le!
                    className="w-25 btn btn-outline-dark d-flex flex-row align-items-center justify-content-center mb-1"
                    // La click pe butonul de login se apeleaza metoda signInWithGoogle, venita
                    // prin mapDispatchToProps.
                    onClick={() => this.props.signInWithGoogle()}
                >
                    <Google style={{width:40, heigth: 40}}/>
                    {/* text-nowrap nu lasa textul sa se intinda pe mai multe randuri */}
                    <span className="text-nowrap pl-4">Log in with Google</span>
                </button>

                <button
                style={{height:60}}
                    // Clasele sunt de Bootstrap, din nou, daca nu le stiti, cautati-le!
                    className="w-25 btn btn-outline-dark d-flex flex-row align-items-center justify-content-center"
                    // La click pe butonul de login se apeleaza metoda signInWithGoogle, venita
                    // prin mapDispatchToProps.
                    onClick={() => this.props.signInWithFacebook()}
                >
                    <Facebook style={{width:35, heigth: 35}}/>
                    {/* text-nowrap nu lasa textul sa se intinda pe mai multe randuri */}
                    <span className="text-nowrap pl-4">Log in with Facebook</span>
                </button>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        // ATENTIE FOARTE MARE CE LUATI DIN STORE! Daca ati fi luat ca valoare pentru user doar
        // state.user.data, atunci de fiecare data cand se modifica valoarea lui user, store-ul
        // nu se actualiza!! Tineti minte mecanismul de comunicare a componentelor cu store-ul:
        // cand store-ul se actualizeaza, se verifica componentele care sunt conectate la store si
        // iau prin mapStateToProps FIX campurile care sunt actualizate in store. In cazul de fata
        // se modifica valoarea lui state.user.data.user, iar pentru store este diferit de
        // state.user.data, intrucat el verifica modficarile SHALLOW intamplate(pe primul nivel).
        user: state.user.data
    }
}
// Vom vrea la click pe buton sa apelam functia de signin cu Google, adica sa dispatch-uim actiunea
// loginUser catre store.
const mapDispatchToProps = (dispatch) => {
    return {
        signInWithGoogle: () => dispatch(loginUserWithGoogle()),
        signInWithFacebook: () => dispatch(loginUserWithFacebook())
    }
}

// conectam Loginul la store
export default connect(mapStateToProps, mapDispatchToProps)(Login);