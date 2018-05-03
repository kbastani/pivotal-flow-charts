$("#flow-text").html("q=>start: Queue\n" +
    "eq=>condition: Existing Queue?\n" +
    "cba=>condition: Cloud-based app?\n" +
    "dtr=>condition: Desire to refactor?\n" +
    "hi=>condition: Host Integration?\n" +
    "qia=>condition: Queue Internal to App?\n" +
    "mq=>end: IBM MQ\n" +
    "rabbit=>end: RabbitMQ\n\n" +
    "q->eq\n" +
    "eq(yes)->dtr\n" +
    "eq(no)->cba\n" +
    "cba(yes)->qia\n" +
    "cba(no)->dtr\n" +
    "dtr(no)->hi\n" +
    "dtr(yes)->qia\n" +
    "hi(yes)->mq\n" +
    "qia(yes)->rabbit");

var langTools = ace.require("ace/ext/language_tools");
var editor = ace.edit("flow-text");
editor.setTheme("ace/theme/chrome");
editor.setOptions({enableBasicAutocompletion: true, enableLiveAutocompletion: true});
editor.getSession().setMode("ace/mode/asciidoc");
var completer = {
    getCompletions: function (editor, session, pos, prefix, callback) {
        if (prefix.length === 0) {
            callback(null, []);
            return
        }
        var reserved = ["->", "condition: ", "operation: ", "end: ", "start: ", "eq"];

        callback(null, reserved.map(function (ea) {
            return {name: ea, value: ea, score: 1.0, meta: "snippets"}
        }));
    }
};
langTools.addCompleter(completer);
$(document).ready(function () {
    $("#submit").click(function () {
        loadDiagram();
    });
    loadDiagram();
});

var loadDiagram = function () {
    $("#diagram").html("");
    var diagram = flowchart.parse(editor.getValue());

    diagram.drawSVG('diagram', {
        'x': 0,
        'y': 0,
        'line-width': 2,
        'line-length': 50,
        'text-margin': 10,
        'font-size': 14,
        'font-color': 'black',
        'line-color': 'black',
        'element-color': 'black',
        'fill': 'white',
        'yes-text': 'yes',
        'no-text': 'no',
        'arrow-end': 'block',
        'scale': 1,
        'symbols': {
            'start': {
                'font-color': 'black',
                'element-color': 'black',
                'fill': 'white'
            },
            'end': {
                'class': 'end-element'
            }
        }
    });

    $("#diagram")
        .find("svg")
        .removeAttr("height")
        .removeAttr("width");
};