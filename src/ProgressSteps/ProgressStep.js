import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, ScrollView, View } from 'react-native';

import ProgressButtons from './ProgressButtons';

class ProgressStep extends Component {
  onNextStep = async () => {
    this.props.onNext && (await this.props.onNext());

    // Return out of method before moving to next step if errors exist.
    if (this.props.errors) {
      return;
    }

    this.props.setActiveStep(this.props.activeStep + 1);
  };

  onPreviousStep = () => {
    // Changes active index and calls previous function passed by parent
    this.props.onPrevious && this.props.onPrevious();
    this.props.setActiveStep(this.props.activeStep - 1);
  };

  onSubmit = () => {
    this.props.onSubmit && this.props.onSubmit();
  };

  renderNextButton = () => {
    return (
      <Button
        title={this.props.activeStep === this.props.stepCount - 1 ? this.props.finishBtnText : this.props.nextBtnText}
        onPress={this.props.activeStep === this.props.stepCount - 1 ? this.onSubmit : this.onNextStep}
        disabled={this.props.nextBtnDisabled}
        color="#265CE7" // Change the button color to your desired style
      />
    );
  };

  renderPreviousButton = () => {
    // Hide the Previous button when it's the first step (activeStep === 0)
    if (this.props.activeStep === 0) {
      return null;
    }
    
    return (
      <Button
        title={this.props.previousBtnText}
        onPress={this.onPreviousStep}
        disabled={this.props.previousBtnDisabled}
        color="#265CE7" // Change the button color to your desired style
      />
    );
  };

  render() {
    const scrollViewProps = this.props.scrollViewProps || {};
    const viewProps = this.props.viewProps || {};
    const isScrollable = this.props.scrollable;
    const buttonRow = this.props.removeBtnRow ? null : (
      <ProgressButtons 
        renderNextButton={this.renderNextButton} 
        renderPreviousButton={this.renderPreviousButton} 
      />
    );

    return (
      <View style={{ flex: 1 }}>
        {isScrollable
          ? <ScrollView {...scrollViewProps}>{this.props.children}</ScrollView>
          : <View {...viewProps}>{this.props.children}</View>}

        {buttonRow}
      </View>
    );
  }
}

ProgressStep.propTypes = {
  label: PropTypes.string,
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
  onSubmit: PropTypes.func,
  setActiveStep: PropTypes.func,
  nextBtnText: PropTypes.string,
  previousBtnText: PropTypes.string,
  finishBtnText: PropTypes.string,
  stepCount: PropTypes.number,
  nextBtnStyle: PropTypes.object,
  nextBtnTextStyle: PropTypes.object,
  nextBtnDisabled: PropTypes.bool,
  previousBtnStyle: PropTypes.object,
  previousBtnTextStyle: PropTypes.object,
  previousBtnDisabled: PropTypes.bool,
  scrollViewProps: PropTypes.object,
  viewProps: PropTypes.object,
  errors: PropTypes.bool,
  removeBtnRow: PropTypes.bool,
  scrollable: PropTypes.bool
};

ProgressStep.defaultProps = {
  nextBtnText: 'Next',
  previousBtnText: 'Previous',
  finishBtnText: 'Submit',
  nextBtnDisabled: false,
  previousBtnDisabled: false,
  errors: false,
  removeBtnRow: false,
  scrollable: true
};

export default ProgressStep;
