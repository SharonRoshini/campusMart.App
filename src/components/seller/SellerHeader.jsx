import React, { useState } from 'react';
import { Form, Card, Badge, Accordion, Button } from 'react-bootstrap';
import { Home, DollarSign, Package, Clock, Activity, Grid, Filter } from 'lucide-react';
import { RESIDENCE_OPTIONS, PRICE_OPTIONS, CONDITION_OPTIONS, USAGE_OPTIONS,  AGE_OPTIONS, CATEGORY_OPTIONS } from '../../constants/options';

const SellerHeader = () => {
  const [selectedResidence, setSelectedResidence] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState([]);
  const [selectedUsage, setSelectedUsage] = useState([]);
  const [selectedAge, setSelectedAge] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const handleCheckboxChange = (selectedValues, setSelectedValues) => (value) => {
    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value];
    setSelectedValues(updatedValues);
  };

  // Function to handle clearing all filters
  const handleClearFilters = () => {
    setSelectedResidence([]);
    setSelectedPriceRange([]);
    setSelectedCondition([]);
    setSelectedUsage([]);
    setSelectedAge([]);
    setSelectedCategory([]);
  };

  const CheckboxGroup = ({ options, selectedValues, onChange }) => (
    <Form className="px-2">
      {options.map(({ label, value }) => (
        <Form.Check
          key={value}
          type="checkbox"
          className="mb-2 custom-checkbox"
          label={
            <span className="d-flex justify-content-between w-100">
              {label}
              {selectedValues.includes(value) && (
                <Badge bg="primary" pill className="ms-2">
                  ✓
                </Badge>
              )}
            </span>
          }
          checked={selectedValues.includes(value)}
          onChange={() => onChange(value)}
        />
      ))}
    </Form>
  );

  const getTotalSelectedFilters = () => {
    return [
      selectedResidence,
      selectedPriceRange,
      selectedCondition,
      selectedUsage,
      selectedAge,
      selectedCategory
    ].reduce((acc, curr) => acc + curr.length, 0);
  };

  return (
    <Card className="shadow-sm border-0" style={{ width: '280px' }}>
      <Card.Header className="bg-white border-bottom-0 d-flex justify-content-between align-items-center py-3">
        <div className="d-flex align-items-center">
          <Filter className="me-2" size={20} />
          <h5 className="mb-0" style={{ fontWeight: 'bold', color: '#007bff' }}>Filters</h5> {/* Bold and colorful Filters */}
        </div>
        {getTotalSelectedFilters() > 0 && (
          <Badge bg="primary" pill>
            {getTotalSelectedFilters()}
          </Badge>
        )}
      </Card.Header>
      <Card.Body className="p-0">
        <Accordion flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <Home size={16} className="me-2" /> Residence
            </Accordion.Header>
            <Accordion.Body>
              <CheckboxGroup
                options={RESIDENCE_OPTIONS}
                selectedValues={selectedResidence}
                onChange={handleCheckboxChange(selectedResidence, setSelectedResidence)}
              />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <DollarSign size={16} className="me-2" /> Price Range
            </Accordion.Header>
            <Accordion.Body>
              <CheckboxGroup
                options={PRICE_OPTIONS}
                selectedValues={selectedPriceRange}
                onChange={handleCheckboxChange(selectedPriceRange, setSelectedPriceRange)}
              />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <Activity size={16} className="me-2" /> Condition
            </Accordion.Header>
            <Accordion.Body>
              <CheckboxGroup
                options={CONDITION_OPTIONS}
                selectedValues={selectedCondition}
                onChange={handleCheckboxChange(selectedCondition, setSelectedCondition)}
              />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <Package size={16} className="me-2" /> Usage
            </Accordion.Header>
            <Accordion.Body>
              <CheckboxGroup
                options={USAGE_OPTIONS}
                selectedValues={selectedUsage}
                onChange={handleCheckboxChange(selectedUsage, setSelectedUsage)}
              />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="4">
            <Accordion.Header>
              <Clock size={16} className="me-2" /> Age
            </Accordion.Header>
            <Accordion.Body>
              <CheckboxGroup
                options={AGE_OPTIONS}
                selectedValues={selectedAge}
                onChange={handleCheckboxChange(selectedAge, setSelectedAge)}
              />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="5">
            <Accordion.Header>
              <Grid size={16} className="me-2" /> Category
            </Accordion.Header>
            <Accordion.Body>
              <CheckboxGroup
                options={CATEGORY_OPTIONS}
                selectedValues={selectedCategory}
                onChange={handleCheckboxChange(selectedCategory, setSelectedCategory)}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Card.Body>
      {getTotalSelectedFilters() > 0 && (
        <Card.Footer className="bg-white border-top-0 p-3">
          <Button variant="outline-secondary" size="sm" className="w-100" onClick={handleClearFilters}>
            Clear All Filters ({getTotalSelectedFilters()})
          </Button>
        </Card.Footer>
      )}
    </Card>
  );
};

export default SellerHeader;
