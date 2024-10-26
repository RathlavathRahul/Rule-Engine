import React, { useState } from 'react';
import { evaluateRule } from '../api/ruleApi';

const RuleEvaluator = () => {
  const [conditions, setConditions] = useState([{ attribute: 'age', operator: '>', value: '' }]);
  const [userData, setUserData] = useState([
    { attribute: 'age', value: '' },
    { attribute: 'department', value: '' },
    { attribute: 'salary', value: '' },
    { attribute: 'experience', value: '' }
  ]);
  const [evaluationResult, setEvaluationResult] = useState(null); // State for result

  const handleConditionChange = (index, field, value) => {
    const newConditions = [...conditions];
    newConditions[index][field] = value;
    setConditions(newConditions);
  };

  const addCondition = () => {
    setConditions([...conditions, { attribute: 'age', operator: '>', value: '' }]);
  };

  const removeCondition = (index) => {
    const newConditions = conditions.filter((_, i) => i !== index);
    setConditions(newConditions);
  };

  const handleUserDataChange = (index, value) => {
    const newUserData = [...userData];
    newUserData[index].value = value;
    setUserData(newUserData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const combinedAST = conditions.reduce((acc, condition) => {
        const ast = {
          type: 'BinaryExpression',
          operator: condition.operator,
          left: { name: condition.attribute },
          right: {
            value: condition.attribute === 'department' ? condition.value : Number(condition.value),
          },
        };

        if (condition.attribute === 'department') {
          ast.operator = '==';
        }

        if (!acc) return ast;

        return {
          type: 'LogicalExpression',
          operator: '&&',
          left: acc,
          right: ast,
        };
      }, null);

      const data = userData.reduce((obj, item) => {
        obj[item.attribute] = item.attribute === 'department' ? item.value : Number(item.value);
        return obj;
      }, {});

      const response = await evaluateRule(combinedAST, data);
      setEvaluationResult(response.result ? 'Rule passed!' : 'Rule failed!'); // Store result
    } catch (err) {
      console.log('Error: Invalid inputs');
      setEvaluationResult('Error occurred during evaluation.'); // Set error message
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '20px' }}>Rule Engine Evaluator</h1>
      <form onSubmit={handleSubmit}>
        <h3>Conditions</h3>
        {conditions.map((condition, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <select
              value={condition.attribute}
              onChange={(e) => handleConditionChange(index, 'attribute', e.target.value)}
              style={{ marginRight: '10px' }}
            >
              <option value="age">Age</option>
              <option value="salary">Salary</option>
              <option value="experience">Experience</option>
              <option value="department">Department</option>
            </select>
            <select
              value={condition.operator}
              onChange={(e) => handleConditionChange(index, 'operator', e.target.value)}
              disabled={condition.attribute === 'department'}
              style={{ marginRight: '10px' }}
            >
              {condition.attribute === 'department' ? (
                <option value="=="> = </option>
              ) : (
                <>
                  <option value=">">&gt;</option>
                  <option value=">="> ≥ </option>
                  <option value="<">&lt;</option>
                  <option value="<="> ≤ </option>
                  <option value="=="> = </option>
                  <option value="!="> ≠ </option>
                </>
              )}
            </select>
            <input
              type="text"
              value={condition.value}
              onChange={(e) => handleConditionChange(index, 'value', e.target.value)}
              placeholder="Enter a value"
              required
              style={{ marginRight: '10px' }}
            />
            <button
              type="button"
              onClick={() => removeCondition(index)}
              style={{ marginLeft: '5px' }}
            >
              Remove
            </button>
          </div>
        ))}

        <button type="button" onClick={addCondition} style={{ marginBottom: '20px' }}>
          Add Condition
        </button>

        <h3>User Data</h3>
        {userData.map((dataItem, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              {dataItem.attribute.charAt(0).toUpperCase() + dataItem.attribute.slice(1)}
            </label>
            <input
              type={dataItem.attribute === 'department' ? 'text' : 'number'}
              value={dataItem.value}
              onChange={(e) => handleUserDataChange(index, e.target.value)}
              placeholder={`Enter ${dataItem.attribute}`}
              required
            />
          </div>
        ))}

        <button type="submit" style={{ marginTop: '20px' }}>
          Evaluate Rule
        </button>
      </form>

      {/* Display evaluation result */}
      {evaluationResult && (
        <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
          {evaluationResult}
        </div>
      )}
    </div>
  );
};

export default RuleEvaluator;
