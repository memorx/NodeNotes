
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: 'Body of note',
        demand: true,
        alias: 'b'
};

// node app.js [add] --help
const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all nodes')
    .command('read', 'Read a note' ,{
        title: titleOptions
    })
    .command('remove', 'Remove a node', {
        title: titleOptions

    })
    .help()
    .argv;
var command = argv._[0];

if (command === 'add') {
    var note = notes.addNote(argv.title,  argv.body);

    if (note)
        console.log(`Note added successfully title: ${note.title}, body: ${note.body}`);
    else
        console.log('Note already exists');


} else if (command === 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`);
    allNotes.forEach((note) => note ? console.log(`Note was found title is ${note.title}, body is ${note.body} `) : console.log('Note was not found'));
}  else if (command === 'read') {
    var noteRead = notes.getNote(argv.title);
    var message = noteRead ? `Note was found title is ${noteRead.title}, body is ${noteRead.body} ` : 'Note was not found';
    console.log(message);

} else if (command === 'remove') {
    var noteRemoved = notes.remove(argv.title);
    var message = noteRemoved ? 'Note was removed' : 'Note was not found';
    console.log(message);
} else {
    console.log('Error');
}

