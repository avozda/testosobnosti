import React, { useEffect, useState, useContext } from "react";
import { useToast } from "@chakra-ui/react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import TestCard from "../../components/TestCard";
import { Spinner, Heading, Stack, Text } from "@chakra-ui/react";
import FinishedTests from "../../components/FinishedTests";

const Test = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [currentQuestion, setCurrent] = useState(0);
  const [finished, isFinished] = useState(false);
  const [testResult, setResult] = useState({});
  const toast = useToast();
  let RAISEC = {
    R: 0,
    A: 0,
    I: 0,
    S: 0,
    E: 0,
    C: 0,
  };

  const getQuestions = async () => {
    setLoading(true);
    try {
      const res = await api.get("/questions");
      setQuestions(res.data);
      setLoading(false);
    } catch (err) {
      const errors = err.response.data;
      if (errors.msg) {
        toast({
          title: errors.msg,
          status: "error",
          duration: 9000,
          position: "bottom-right",
          isClosable: true,
        });
      }
      if (!errors && err.message) {
        toast({
          title: err.message,
          status: "error",
          duration: 9000,
          position: "bottom-right",
          isClosable: true,
        });
      }
      if (Array.isArray(errors.errors)) {
        errors.errors.forEach((error) =>
          toast({
            title: error.msg,
            status: "error",
            duration: 9000,
            position: "bottom-right",
            isClosable: true,
          })
        );
      }
      setLoading(false);
      setQuestions([]);
    }
  };
  useEffect(() => {
    getQuestions();
  }, []);

  const nextQuestion = (val) => {
    questions[currentQuestion].value = parseInt(val);
    if (currentQuestion == questions.length - 1) {
      questions.forEach((element) => {
        if (element.value) {
          switch (element.type) {
            case "R":
              RAISEC = { ...RAISEC, R: RAISEC.R + parseInt(element.value) };
              break;
            case "A":
              RAISEC = { ...RAISEC, A: RAISEC.A + element.value };
              break;
            case "I":
              RAISEC = { ...RAISEC, I: RAISEC.I + element.value };
              break;
            case "S":
              RAISEC = { ...RAISEC, S: RAISEC.S + element.value };
              break;
            case "E":
              RAISEC = { ...RAISEC, E: RAISEC.E + element.value };
              break;
            case "C":
              RAISEC = { ...RAISEC, C: RAISEC.C + element.value };
              break;
          }
        }
      });
      setResult(RAISEC);
      isFinished(true);
      return;
    }
    if (currentQuestion < questions.length) {
      setCurrent(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion != 0) {
      setCurrent(currentQuestion - 1);
    }
  };

  const sendResult = async () => {
    try {
      setLoading(true);
      const res = await api.post("/answers", testResult);
      setLoading(false);
      navigate("/result/" + res.data._id);
    } catch (err) {
      const errors = err.response.data;
      if (errors.msg) {
        toast({
          title: err.msg,
          status: "error",
          duration: 9000,
          position: "bottom-right",
          isClosable: true,
        });
      }
      if (!errors && err.message) {
        toast({
          title: err.message,
          status: "error",
          duration: 9000,
          position: "bottom-right",
          isClosable: true,
        });
      }
      if (Array.isArray(errors.errors)) {
        errors.errors.forEach((error) =>
          toast({
            title: error.msg,
            status: "error",
            duration: 9000,
            position: "bottom-right",
            isClosable: true,
          })
        );
      }
      setLoading(false);
      setQuestions([]);
    }
  };

  return (
    <section>
      {finished ? (
        <FinishedTests click={sendResult} loading={loading} />
      ) : (
        <>
          <Stack pt={10} align={"center"}>
            <Heading>
              Test osobnosti <span style={{ color: "#43b3ae" }}>RAISEC</span>{" "}
            </Heading>
            <Text align={"center"} fontSize="sm" pb={0} p={5}>
              Přečti si tvrzení a následně zvol: 0 - nevystihuje mě, 1 -
              částečně mě vystihuje, 2 - přesně mě vystihuje.
            </Text>
          </Stack>
          {!loading && questions ? (
            <TestCard
              backClick={previousQuestion}
              nextClick={nextQuestion}
              question={questions[currentQuestion]}
              number={currentQuestion + 1}
            />
          ) : (
            <Stack direction="row" mt={20} align={"center"} spacing={4}>
              <Spinner color="teal" m={"auto"} align={"center"} />{" "}
            </Stack>
          )}
        </>
      )}
    </section>
  );
};

export default Test;
