# Input 输入框

## 基础用法

这是一个 Input 输入框

<demo src="./example/basic-input.vue"></demo>

## 禁用状态

通过 disabled 属性指定是否禁用 input 组件

<demo src="./example/disabled-input.vue"></demo>

## 一键清空

使用 clearable 属性即可得到一个可一键清空的输入框

<demo src="./example/clearable-input.vue"></demo>

## 格式化

在 formatter 的情况下显示值，我们通常同时使用 parser

<demo src="./example/formatter-input.vue"></demo>

## 密码框

使用 show-password 属性即可得到一个可切换显示隐藏的密码框

<demo src="./example/password-input.vue"></demo>

## 带图标的输入框

带有图标标记输入类型

<demo src="./example/icon-input.vue"></demo>

## 文本域

用于输入多行文本信息可缩放的输入框。 Resizable for entering multiple lines of text

文本域高度可通过 rows 属性控制

<demo src="./example/textarea-input.vue"></demo>

## 自适应文本域

设置文字输入类型的 autosize 属性使得根据内容自动调整的高度。 你可以给 autosize 提供一个包含有最大和最小高度的对象，让输入框自动调整。

<demo src="./example/autosize-textarea.vue"></demo>

## 复合型输入框

可以在输入框中前置或后置一个元素，通常是标签或按钮

要在输入框中添加图标，你可以简单地使用 prefix-icon 和 suffix-icon 属性。 另外， prefix 和 suffix 命名的插槽也能正常工作。

<demo src="./example/compound-input.vue"></demo>

## 尺寸

使用 size 属性改变输入框大小。 除了默认大小外，还有另外两个选项： large, small。

<demo src="./example/size-input.vue"></demo>
