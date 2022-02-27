import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

const Quiz = ({category, dictionary}) => {
    const [answerOptions, setAnswerOptions] = useState([]);
    const [result, setResult] = useState('');
    const [englishAnswer, setEnglish] = useState('');
    const [serbianQuery, setSerbian] = useState('');
    const [attempted, setAttempt] = useState(false);

    const [q, setQ] = useState(0); // question count
    const [used, setUsed] = useState([]); // used words
    const [attempts, setAttempts] = useState(0); // attempt count
    const [score, setScore] = useState(0); // score count
    const [finished, setFinish] = useState(false);

    const endOfQuiz = () => {
        setFinish(true);
    };

    const resetQuiz = () => {
        setFinish(false);
        setQ(0);
        setScore(0);
        setAttempt(false);
        setAttempts(0);
        setUsed([]);
        setAnswerOptions([]);
        setResult('');
        setEnglish('');
        setSerbian('');
        findAnswers();
    };

    const resetQuestions = () => {
        setScore(attempts === 1 ? 1 + score : score);
        q === 9 ? endOfQuiz() :
            setQ(q + 1);
        console.log('resetting..');
        setAttempt(false);
        setAttempts(0);
        setAnswerOptions([]);
        setResult('');
        setEnglish('');
        setSerbian('');
        findAnswers();
    };

    const shuffleData = data => {
        let i = data.length - 1;
        while (i > 0) {
            const j = Math.floor(Math.random() * (i + 1)),
                temp = data[i];
            data[i] = data[j];
            data[j] = temp;
            i--;
        }
        return data;
    };

    const incAttempt = () => {
        setAttempts(attempts + 1);
    };

    const checkAnswer = attempt => {
        incAttempt();
        setAttempt(true);
        if (attempt === englishAnswer) {
            setResult('correct');
        } else {
            setResult('incorrect');
        }
    };

    useEffect(() => {
        findAnswers();
    }, []);

    const findAnswers = () => {
        const wordFind = dictionary[category];
        console.log(used);

        // Pick a translation at random
        const unused = wordFind.filter(item => !used.includes(item.english));
        const random = unused[Math.floor(Math.random() * unused.length)];
        setEnglish(random.english);
        setSerbian(random.serbian);
        setUsed(used => [...used, random.english]); // note used answer

        // Create empty array for non-answer options
        const otherAnswers = [];
        // Create array for options to be displayed
        const answers = [];
        answers.push(random.english); // add English answer we already know

        // Filter out correct answers and map to array
        const allAnswers = wordFind.filter(x => x.english !== random.english);
        allAnswers.map(randAns => {
            otherAnswers.push(randAns.english);
        });
        const someOtherAnswers = shuffleData([...otherAnswers]);

        answers.push(
            someOtherAnswers[0],
            someOtherAnswers[1],
            someOtherAnswers[2],
            someOtherAnswers[3],
        );
        const shuffled = shuffleData([...answers]);
        console.log('setting answers as ' + shuffled);
        setAnswerOptions(shuffled);
    };

    const styles = StyleSheet.create({
        query: {
            textAlign: 'center',
            fontSize: 40,
            paddingBottom: 20,
        },
        answerButton: {
            padding: 60,
            backgroundColor: 'black'
        },
        nextField: {
            marginTop: 30,
            padding: 10,
            alignItems: 'center',
            borderRadius: 10,
        },
        resultField: {
            marginTop: 30,
            padding: 10,
            borderRadius: 10,
        },
        correct: {
            marginTop: 10,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            borderRadius: 10,
            color: 'white',
            backgroundColor: 'green',
            transform: [{scale: 1}],
        },
        wrong: {
            marginTop: 10,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            borderRadius: 10,
            color: 'white',
            backgroundColor: 'crimson',
            transform: [{scale: 1}],
        },
        hide: {
            height: 0,
            transform: [{scale: 0}],
        },
        show: {
            transform: [{scale: 1}],
        },
        resultIcon: {
            paddingRight: 20,
        },
        nextButton: {
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 40 / 2,
            width: 80,
            height: 80,
            padding: 10,
            justifyContent: 'center',
        },
        resultText: {
            color: 'white',
            fontSize: 20,
            marginTop: 10,
        },
        scoreBoard: {
            position: 'absolute',
            zIndex: 999,
            backgroundColor: 'white',
            color: 'white',
            padding: 20,
            width: 300,
            borderRadius: 30,
            height: 500,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            textAlign: 'center',
        },
        resultsHeader: {
            padding: 20,
            fontWeight: 'bold',
            fontSize: 20,
        },
        scoreStat: {
            fontSize: 30,
            fontWeight: '200',
        },
        scoreValue: {
            fontSize: 60,
        },
        goAgain: {
            marginTop: 60,
            marginBottom: 20,
        },
    });

    return (
        <View>
            <View style={finished ? styles.hide : styles.show}>
                <Text style={styles.query}>{serbianQuery}</Text>
                {answerOptions.map(answerOption => (
                    <Button
                        key={answerOption}
                        onPress={() => checkAnswer(answerOption)}
                        title={answerOption}
                    />
                ))}
            </View>
            <View style={attempted ? styles.resultField : styles.hide}>
                <View style={result === 'correct' ? styles.correct : styles.wrong}>
                    <Icon
                        name={result === 'correct' ? 'check' : 'dangerous'}
                        size={30}
                        color="white"
                        style={styles.resultIcon}
                    />
                    <Text style={styles.resultText}>
                        {result === 'correct' ? 'Correct! Nice job' : 'Bad Luck! Try again'}
                    </Text>
                </View>
            </View>
            <View style={styles.nextField}>
                <TouchableOpacity
                    style={result === 'correct' ? styles.nextButton : styles.hide}
                    onPress={() => resetQuestions()}>
                    <Icon name="forward" size={40} color="black"/>
                    <Text>NEXT</Text>
                </TouchableOpacity>
            </View>
            {/*Final Scores*/}
            <View style={finished ? styles.scoreBoard : styles.hide}>
                <Text style={styles.resultsHeader}>
                    {score >= 7 && score < 10 ? 'Hey not bad!' : ''}
                    {score >= 3 && score < 7 ? 'Getting there...' : ''}
                    {score < 3 ? 'Abysmal!' : ''}
                    {score === 10 ? 'Woah top marks!' : ''}
                </Text>
                <Text style={styles.scoreStat}>Score</Text>
                <Text style={styles.scoreValue}>{score * 10}%</Text>
                <Text style={styles.goAgain}>Ready to go again?</Text>
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => resetQuiz()}>
                    <Icon name="cached" size={40} color="black"/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Quiz;
