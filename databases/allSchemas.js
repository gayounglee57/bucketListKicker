import Realm from 'realm';
export const TODOLIST_SCHEMA = "TodoList";
export const TODO_SCHEMA = "Todo";

//defining table model (like defining a class)
export const TodoSchema = {
	name: TODO_SCHEMA, //refer to schemas later using this name; name of table
	primaryKey: 'id', //makes id property from below the primary key of the table
	properties: {
		id: 'int',
		name: {type: 'string', indexed: true}, //latter option adds index to each row in table to help with search
		done: {type: 'bool', default: false},
	}
};

export const TodoListSchema = {
	name: TODOLIST_SCHEMA,
	primaryKey: 'id',
	properties: {
		id: 'int',
		name: 'string',
		creationDate: 'date',
		todos: {type: 'list', objectType: TODO_SCHEMA}, //list or array of to-do items in one to-do list ie. one to many relationship
	}
};

const databaseOptions = {
	path: 'todoListApp.realm', //where the db file is located... where is this?
	schema: [TodoListSchema, TodoSchema],
	schemaVersion: 0, //useful when migration db from old to new schema but optional
};

//functions for to-do lists
//q: where does newTodoList js object come from? And why the arrows?
//a: newTodoList gets passed in as param when insertNewTodoList() is called in a component. Arrows are so that what's on the left gets applied to what's on the right
export const insertNewTodoList = newTodoList => new Promise((resolve, reject) => {
	Realm.open(databaseOptions).then(realm => {
		realm.write(() => {
			realm.create(TODOLIST_SCHEMA, newTodoList); //first param is the schema used to create a new table; second param are the values for the new table 
			resolve(newTodoList); //param used when .then() is called with the promise
		});
	})
	.catch((error) => reject(error));
});

export const deleteTodoList = todoListId => new Promise((resolve, reject) => {
	Realm.open(databaseOptions).then(realm => {
		realm.write(() => {
			let deletingTodoList = realm.objectForPrimaryKey(TODOLIST_SCHEMA, todoListId);
			realm.delete(deletingTodoList);
			resolve();
		});
	})
	.catch((error) => reject(error));
});

export const queryAllTodoLists = () => new Promise((resolve, reject) => {
	Realm.open(databaseOptions).then(realm => {
			let allTodoLists = realm.objects(TODOLIST_SCHEMA).sorted('creationDate', false);
			resolve(allTodoLists);
	}).catch((error) => {
		reject(error)
	});
});

export default new Realm(databaseOptions);