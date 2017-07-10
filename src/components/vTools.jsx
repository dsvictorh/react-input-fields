import '../css/input-fields.css';
import InputText from './InputText';
import InputButton from './InputButton';
import InputDropdown from './InputDropdown';
import InputCheckbox from './InputCheckbox';
import InputDate from './InputDate';
import InputTextArea from './InputTextArea';
import InputRadioButton from './InputRadioButton';

export default { 
	InputText, 
	InputButton, 
	InputDropdown, 
	InputCheckbox, 
	InputDate,
	InputTextArea,
	InputRadioButton
};

/* FORCE CHANGE EVENT
var ev = new Event('input', { bubbles: true });
document.getElementById('name').dispatchEvent(ev);
*/