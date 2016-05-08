import Blockly from './core/initialization/blockly';

import JavaScript from './generators/javascript';
import Python from './generators/python';

Blockly.JavaScript = JavaScript;
Blockly.Python = Python;

export default Blockly;
