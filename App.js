import React, {useState} from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Platform, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Keyboard } from 'react-native-web';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState('');
  const [taskItem, setTaskItem] = useState([]);

  const handleAddTask = () => {
    setTaskItem([...taskItem, task]);
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItem];
    itemsCopy.splice(index, 1);
    setTaskItem(itemsCopy);
  }

  return (
    <View style={styles.container}>
        <View style={styles.taskWrapper}>
            <Text style={styles.sectionTitle}>Today's Task(s)</Text>
            <View style={styles.item}>
              <ScrollView alwaysBounceVertical={false}>
              {
                taskItem.map((item, index) => {
                  return ( 
                  <TouchableOpacity key={index} onPress={() => completeTask(index)} >
                    <Task text={item} />
                  </TouchableOpacity>
                  )
                })
              }
              </ScrollView>
            </View>
        </View>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : "height"} style={styles.writeTaskWrapper}>
          <TextInput style={styles.input} placeholder={'Add a Task'} value={task == null ? '' : task} onChangeText={text => setTask(text)} />
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>  
            </View> 
          </TouchableOpacity>
          </KeyboardAvoidingView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontWeight: 'bold',
  },

  item: {
    marginTop: 30,
  },

  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,

  },

  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#ff73f4',
    borderWidth: 1,
  },

  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ff73f4',
    borderWidth: 1,
  },

  addText: {},

});
