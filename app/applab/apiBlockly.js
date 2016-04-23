
export function randomFromArray(values) {
  var key = Math.floor(Math.random() * values.length);
  return values[key];
};

// APIs needed for blockly (must include blockId) (keep in sync with api.js):

export function container(blockId, elementId, html) {
  return Applab.executeCmd(blockId,
                          'container',
                          {'elementId': elementId,
                           'html': html });
};

export function write(blockId, html) {
  return Applab.executeCmd(blockId,
                          'write',
                          {'html': html });
};

export function innerHTML(blockId, elementId, html) {
  return Applab.executeCmd(blockId,
                          'innerHTML',
                          {'elementId': elementId,
                           'html': html });
};

export function deleteElement(blockId, elementId) {
  return Applab.executeCmd(blockId,
                          'deleteElement',
                          {'elementId': elementId });
};

export function showElement(blockId, elementId) {
  return Applab.executeCmd(blockId,
                          'showElement',
                          {'elementId': elementId });
};

export function hideElement(blockId, elementId) {
  return Applab.executeCmd(blockId,
                          'hideElement',
                          {'elementId': elementId });
};

export function setScreen(blockId, screenId) {
  return Applab.executeCmd(blockId,
                          'setScreen',
                          {'screenId': screenId });
};

export function button(blockId, elementId, text) {
  return Applab.executeCmd(blockId,
                          'button',
                          {'elementId': elementId,
                           'text': text });
};

export function image(blockId, elementId, src) {
  return Applab.executeCmd(blockId,
                          'image',
                          {'elementId': elementId,
                           'src': src });
};

export function setPosition(blockId, elementId, left, top, width, height) {
  return Applab.executeCmd(blockId,
                          'setPosition',
                          {'elementId': elementId,
                           'left': left,
                           'top': top,
                           'width': width,
                           'height': height });
};

export function setSize(blockId, elementId, width, height) {
  return Applab.executeCmd(blockId,
                          'setSize',
                          {'elementId': elementId,
                           'width': width,
                           'height': height });
};


export function getXPosition(blockId, elementId) {
  return Applab.executeCmd(blockId,
                          'getXPosition',
                          {'elementId': elementId });
};

export function getYPosition(blockId, elementId) {
  return Applab.executeCmd(blockId,
                          'getYPosition',
                          {'elementId': elementId });
};

export function createCanvas(blockId, elementId, width, height) {
  return Applab.executeCmd(blockId,
                          'createCanvas',
                          {'elementId': elementId,
                           'width': width,
                           'height': height });
};

export function setActiveCanvas(blockId, elementId) {
  return Applab.executeCmd(blockId,
                          'setActiveCanvas',
                          {'elementId': elementId  });
};

export function line(blockId, x1, y1, x2, y2) {
  return Applab.executeCmd(blockId,
                          'line',
                          {'x1': x1,
                           'y1': y1,
                           'x2': x2,
                           'y2': y2 });
};

export function circle(blockId, x, y, radius) {
  return Applab.executeCmd(blockId,
                          'circle',
                          {'x': x,
                           'y': y,
                           'radius': radius });
};

export function rect(blockId, x, y, width, height) {
  return Applab.executeCmd(blockId,
                          'rect',
                          {'x': x,
                           'y': y,
                           'width': width,
                           'height': height });
};

export function setStrokeWidth(blockId, width) {
  return Applab.executeCmd(blockId,
                          'setStrokeWidth',
                          {'width': width });
};

export function setStrokeColor(blockId, color) {
  return Applab.executeCmd(blockId,
                          'setStrokeColor',
                          {'color': color });
};

export function setFillColor(blockId, color) {
  return Applab.executeCmd(blockId,
                          'setFillColor',
                          {'color': color });
};

export function clearCanvas(blockId) {
  return Applab.executeCmd(blockId, 'clearCanvas');
};

export function drawImage(blockId, imageId, x, y, width, height) {
  return Applab.executeCmd(blockId,
                          'drawImage',
                          {'imageId': imageId,
                           'x': x,
                           'y': y,
                           'width': width,
                           'height': height });
};

export function getImageData(blockId, x, y, width, height) {
  return Applab.executeCmd(blockId,
                          'getImageData',
                          {'x': x,
                           'y': y,
                           'width': width,
                           'height': height });
};

export function putImageData(blockId, imageData, x, y) {
  return Applab.executeCmd(blockId,
                          'putImageData',
                          {'imageData': imageData,
                           'x': x,
                           'y': y });
};

export function textInput(blockId, elementId, text) {
  return Applab.executeCmd(blockId,
                          'textInput',
                          {'elementId': elementId,
                           'text': text });
};

export function textLabel(blockId, elementId, text, forId) {
  return Applab.executeCmd(blockId,
                          'textLabel',
                          {'elementId': elementId,
                           'text': text,
                           'forId': forId });
};

export function checkbox(blockId, elementId, checked) {
  return Applab.executeCmd(blockId,
                          'checkbox',
                          {'elementId': elementId,
                           'checked': checked });
};

export function radioButton(blockId, elementId, checked, name) {
  return Applab.executeCmd(blockId,
                          'radioButton',
                          {'elementId': elementId,
                           'checked': checked,
                           'name': name });
};

export function getChecked(blockId, elementId) {
  return Applab.executeCmd(blockId,
                          'getChecked',
                          {'elementId': elementId });
};

export function setChecked(blockId, elementId, checked) {
  return Applab.executeCmd(blockId,
                          'setChecked',
                          {'elementId': elementId,
                           'checked': checked });
};

export function dropdown(blockId, elementId) {
  var optionsArray = Array.prototype.slice.call(arguments, 2);
  return Applab.executeCmd(blockId,
                          'dropdown',
                          {'elementId': elementId,
                           'optionsArray': optionsArray });
};

export function getAttribute(blockId, elementId, attribute) {
  return Applab.executeCmd(blockId,
                           'getAttribute',
                           {elementId: elementId,
                            attribute: attribute});
};

export function setAttribute(blockId, elementId, attribute, value) {
  return Applab.executeCmd(blockId,
                           'setAttribute',
                           {elementId: elementId,
                            attribute: attribute,
                            value: value});
};

export function getText(blockId, elementId) {
  return Applab.executeCmd(blockId,
                          'getText',
                          {'elementId': elementId });
};

export function setText(blockId, elementId, text) {
  return Applab.executeCmd(blockId,
                          'setText',
                          {'elementId': elementId,
                           'text': text });
};

export function getNumber(blockId, elementId) {
  return Applab.executeCmd(blockId,
                          'getNumber',
                          {'elementId': elementId });
};

export function setNumber(blockId, elementId, number) {
  return Applab.executeCmd(blockId,
                          'setNumber',
                          {'elementId': elementId,
                           'number': number });
};

export function getImageURL(blockId, elementId) {
  return Applab.executeCmd(blockId,
                          'getImageURL',
                          {'elementId': elementId });
};

export function setImageURL(blockId, elementId, src) {
  return Applab.executeCmd(blockId,
                          'setImageURL',
                          {'elementId': elementId,
                           'src': src });
};

export function imageUploadButton(blockId, elementId, text) {
  return Applab.executeCmd(blockId,
                           'imageUploadButton',
                           {'elementId': elementId,
                            'text': text });
};

export function setParent(blockId, elementId, parentId) {
  return Applab.executeCmd(blockId,
                          'setParent',
                          {'elementId': elementId,
                           'parentId': parentId });
};

export function setStyle(blockId, elementId, style) {
  return Applab.executeCmd(blockId,
                           'setStyle',
                           {'elementId': elementId,
                           'style': style });
};

export function onEvent(blockId, elementId, eventName, func) {
  var extraArgs = Array.prototype.slice.call(arguments).slice(4);
  return Applab.executeCmd(blockId,
                          'onEvent',
                          {'elementId': elementId,
                           'eventName': eventName,
                           'func': func,
                           'extraArgs': extraArgs});
};

export function startWebRequest(blockId, url, func) {
  return Applab.executeCmd(blockId,
                          'startWebRequest',
                          {'url': url,
                           'func': func });
};

export function setTimeout(blockId, func, milliseconds) {
  return Applab.executeCmd(blockId,
                          'setTimeout',
                          {'func': func,
                           'milliseconds': milliseconds });
};

export function clearTimeout(blockId, timeoutId) {
  return Applab.executeCmd(blockId,
                           'clearTimeout',
                           {'timeoutId': timeoutId });
};

export function setInterval(blockId, func, milliseconds) {
  return Applab.executeCmd(blockId,
                          'setInterval',
                          {'func': func,
                           'milliseconds': milliseconds });
};

export function clearInterval(blockId, intervalId) {
  return Applab.executeCmd(blockId,
                           'clearInterval',
                           {'intervalId': intervalId });
};

export function playSound(blockId, url) {
  return Applab.executeCmd(blockId,
                          'playSound',
                          {'url': url});
};

export function getKeyValue(blockId, key, onSuccess, onError) {
  return Applab.executeCmd(blockId,
                           'getKeyValue',
                           {'key':key,
                            'onSuccess': onSuccess,
                            'onError': onError});
};

export function setKeyValue(blockId, key, value, onSuccess, onError) {
  return Applab.executeCmd(blockId,
                           'setKeyValue',
                           {'key':key,
                            'value': value,
                            'onSuccess': onSuccess,
                            'onError': onError});
};

export function createRecord(blockId, table, record, onSuccess, onError) {
  return Applab.executeCmd(blockId,
                          'createRecord',
                          {'table': table,
                           'record': record,
                           'onSuccess': onSuccess,
                           'onError': onError});
};

export function readRecords(blockId, table, searchParams, onSuccess, onError) {
  return Applab.executeCmd(blockId,
                          'readRecords',
                          {'table': table,
                           'searchParams': searchParams,
                           'onSuccess': onSuccess,
                           'onError': onError});
};

export function updateRecord(blockId, table, record, onSuccess, onError) {
  return Applab.executeCmd(blockId,
                          'updateRecord',
                          {'table': table,
                           'record': record,
                           'onSuccess': onSuccess,
                           'onError': onError});
};

export function deleteRecord(blockId, table, record, onSuccess, onError) {
  return Applab.executeCmd(blockId,
                          'deleteRecord',
                          {'table': table,
                           'record': record,
                           'onSuccess': onSuccess,
                           'onError': onError});
};

export function onRecordEvent(blockId, table, onRecord) {
  return Applab.executeCmd(blockId,
                          'onRecordEvent',
                          {'table': table,
                           'onRecord': onRecord});
};

export function getUserId(blockId) {
  return Applab.executeCmd(blockId,
                          'getUserId',
                          {});
};

export function moveForward(blockId, distance) {
  return Applab.executeCmd(blockId,
                          'moveForward',
                          {'distance': distance });
};

export function moveBackward(blockId, distance) {
  return Applab.executeCmd(blockId,
                          'moveBackward',
                          {'distance': distance });
};

export function move(blockId, x, y) {
  return Applab.executeCmd(blockId,
                          'move',
                          {'x': x,
                           'y': y });
};

export function moveTo(blockId, x, y) {
  return Applab.executeCmd(blockId,
                          'moveTo',
                          {'x': x,
                           'y': y });
};

export function turnRight(blockId, degrees) {
  return Applab.executeCmd(blockId,
                          'turnRight',
                          {'degrees': degrees });
};

export function turnLeft(blockId, degrees) {
  return Applab.executeCmd(blockId,
                          'turnLeft',
                          {'degrees': degrees });
};

export function turnTo(blockId, direction) {
  return Applab.executeCmd(blockId,
                           'turnTo',
                           {'direction': direction });
};

export function arcRight(blockId, degrees, radius) {
  return Applab.executeCmd(blockId,
                           'arcRight',
                           {'degrees': degrees,
                            'radius': radius });
};

export function arcLeft(blockId, degrees, radius) {
  return Applab.executeCmd(blockId,
                           'arcLeft',
                           {'degrees': degrees,
                            'radius': radius });
};

export function dot(blockId, radius) {
  return Applab.executeCmd(blockId,
                           'dot',
                           {'radius': radius });
};

export function getX(blockId) {
  return Applab.executeCmd(blockId, 'getX');
};

export function getY(blockId) {
  return Applab.executeCmd(blockId, 'getY');
};

export function getDirection(blockId) {
  return Applab.executeCmd(blockId, 'getDirection');
};

export function penUp(blockId) {
  return Applab.executeCmd(blockId, 'penUp');
};

export function penDown(blockId) {
  return Applab.executeCmd(blockId, 'penDown');
};

export function show(blockId) {
  return Applab.executeCmd(blockId, 'show');
};

export function hide(blockId) {
  return Applab.executeCmd(blockId, 'hide');
};

export function speed(blockId, percent) {
  return Applab.executeCmd(blockId,
                           'speed',
                           {'percent': percent});
};

export function penWidth(blockId, width) {
  return Applab.executeCmd(blockId,
                          'penWidth',
                          {'width': width });
};

export function penColor(blockId, color) {
  return Applab.executeCmd(blockId,
                          'penColor',
                          {'color': color });
};

export function penRGB(blockId, r, g, b, a) {
  return Applab.executeCmd(blockId,
                          'penRGB',
                          {'r': r,
                           'g': g,
                           'b': b,
                           'a': a });
};

export function insertItem(blockId, array, index, item) {
  return Applab.executeCmd(blockId,
                          'insertItem',
                          {'array': array,
                           'index': index,
                           'item': item });
};

export function appendItem(blockId, array, item) {
  return Applab.executeCmd(blockId,
                          'appendItem',
                          {'array': array,
                           'item': item });
};

export function removeItem(blockId, array, index) {
  return Applab.executeCmd(blockId,
                          'removeItem',
                          {'array': array,
                           'index': index });
};

export function drawChart(chartId, chartType, chartData, options, callback) {
  return Applab.executeCmd(null,
                          'drawChart',
                          {'chartId': chartId,
                           'chartType': chartType,
                           'chartData': chartData,
                           'options': options,
                           'callback': callback });
};

export function drawChartFromRecords(chartId, chartType, tableName, columns, options, callback) {
  return Applab.executeCmd(null,
                          'drawChartFromRecords',
                          {'chartId': chartId,
                           'chartType': chartType,
                           'tableName': tableName,
                           'columns': columns,
                           'options': options,
                           'callback': callback });
};
